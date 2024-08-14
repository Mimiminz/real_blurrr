package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.constant.Number.GENERAL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.LeagueBoardDetailDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueMentionListResponse;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.leaguemember.exception.NotAllocatedLeagueException;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LeagueBoardServiceImpl implements LeagueBoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final LeagueBoardRepository leagueBoardRepository;
    private final ChannelBoardRepository channelBoardRepository;
    private final LikeRepository likeRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final RedisViewCounterService redisViewCounterService;

    @Override
    public LeagueBoardCreateResponse createLeagueBoard(
            UUID memberId, UUID leagueId, String leagueType, LeagueBoardCreateRequest request
    ) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        isAllocatedLeague(league, member);

        Board createdLeagueBoard = boardRepository.save(
                request.toEntity(league, member)
        );

        return LeagueBoardCreateResponse.of(isCreated(createdLeagueBoard));

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueBoardResponse> getLeagueBoards(
            ContextMember contextMember, UUID leagueId, String leagueType, int pageNumber, String criteria
    ) {

        League league = leagueRepository.getOrThrow(leagueId);

        if (leagueType.equals(LeagueType.MODEL.getValue()) && Objects.nonNull(contextMember)) {
            Member member = memberRepository.getOrThrow(contextMember.getId());
            isAllocatedLeague(league, member);
        }

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        Pageable pageable = PageRequest.of(
                pageNumber, LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.valueOf(criteria).getCriteria())
        );

        Page<LeagueBoard> paginatedResult = leagueBoardRepository
                .findAllByLeagueAndStatus(league, pageable, ActivateStatus.ACTIVE);

        return PaginatedResponse.of(
                paginatedResult.getNumber(),
                paginatedResult.getSize(),
                paginatedResult.getTotalElements(),
                paginatedResult.getTotalPages(),
                paginatedResult.getContent().stream()
                        .map(lb ->
                                LeagueBoardResponse.of(
                                        lb,
                                        redisViewCounterService.addViewCountInRedis(lb.getId(), lb.getViewCount())
                                )
                        )
                        .toList()
        );

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueBoardResponse> findLeagueBoardByLike(UUID id, int pageNumber) {

        Member member = memberRepository.getOrThrow(id);

        Pageable pageable = PageRequest.of(
                pageNumber,
                GENERAL_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.TIME.getCriteria())
        );

        Page<LeagueBoard> likeBoards = leagueBoardRepository.findAllByMemberAndLike(member, pageable, ActivateStatus.ACTIVE);

        return PaginatedResponse.of(
                likeBoards.getNumber(),
                likeBoards.getSize(),
                likeBoards.getTotalElements(),
                likeBoards.getTotalPages(),
                likeBoards.stream()
                        .map(lb ->
                                LeagueBoardResponse.of(
                                        lb,
                                        redisViewCounterService.addViewCountInRedis(lb.getId(), lb.getViewCount())
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueBoardResponse> findMyBoard(UUID memberId, int pageNumber) {

        Member member = memberRepository.getOrThrow(memberId);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.TIME.getCriteria())
        );

        Page<LeagueBoard> boards = leagueBoardRepository.findAllByMemberAndStatus(member, ActivateStatus.ACTIVE, pageable);

        return PaginatedResponse.of(
                boards.getNumber(),
                boards.getSize(),
                boards.getTotalElements(),
                boards.getTotalPages(),
                boards.stream()
                        .map(lb ->
                                LeagueBoardResponse.of(
                                        lb,
                                        redisViewCounterService.addViewCountInRedis(lb.getId(), lb.getViewCount())
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        LeagueBoard board = leagueBoardRepository.getOrThrow(boardId);

        isAllocatedLeague(board.getLeague(), member);

        long viewCountInRedis = redisViewCounterService.increment(boardId);

        return LeagueBoardDetailResponse.of(
                LeagueBoardDetailDto.of(
                        board,
                        board.getViewCount() + viewCountInRedis,
                        isLike(member,  board)
                )
        );

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueMentionListResponse> getMentionLeagueBoards(
            UUID leagueId, UUID memberId, int pageNumber, String criteria
    ) {

        League mentionedLeague = leagueRepository.getOrThrow(leagueId);
        Member member = memberRepository.getOrThrow(memberId);

        isAllocatedLeague(mentionedLeague, member);

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Page<ChannelBoard> paginatedResult = channelBoardRepository
                .findAllByMentionedLeague(mentionedLeague, ActivateStatus.ACTIVE, pageable);

        return PaginatedResponse.of(
                paginatedResult.getNumber(),
                paginatedResult.getSize(),
                paginatedResult.getTotalElements(),
                paginatedResult.getTotalPages(),
                paginatedResult.stream()
                        .map(channelBoard ->
                                LeagueMentionListResponse.of(
                                        channelBoard,
                                        redisViewCounterService.addViewCountInRedis(channelBoard.getId(), channelBoard.getViewCount())
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    private static void isEqualLeagueType(LeagueType reqeustType, LeagueType findLeagueType) {
        if (!reqeustType.equals(findLeagueType)) {
            throw new InvalidLeagueTypeException();
        }
    }

    private void isAllocatedLeague(League league, Member member) {
        if (!leagueMemberRepository.existsByLeagueAndMember(league, member)) {
            throw new NotAllocatedLeagueException();
        }
    }

    private Boolean isLike(Member member, Board board) {
        return likeRepository.existsByMemberAndBoard(member, board);
    }

    private UUID isCreated(Board createdLeagueBoard) {

        boardRepository.findById(createdLeagueBoard.getId())
                .orElseThrow(FailToCreateBoardException::new);

        return createdLeagueBoard.getId();
    }

}