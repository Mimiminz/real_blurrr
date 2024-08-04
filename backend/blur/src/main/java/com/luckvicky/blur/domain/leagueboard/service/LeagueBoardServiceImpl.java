package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_CONTENT;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_NICKNAME;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_TITLE;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.InValidSearchConditionException;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.LeagueBoardDetailDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.leaguemember.exception.NotAllocatedLeagueException;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardLikeResponse;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SearchCondition;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.jwt.model.CustomUserDetails;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LeagueBoardServiceImpl implements LeagueBoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final LeagueBoardRepository leagueBoardRepository;
    private final ChannelBoardRepository channelBoardRepository;
    private final LikeRepository likeRepository;
    private final LeagueMemberRepository leagueMemberRepository;

    @Override
    public UUID createLeagueBoard(UUID memberId, UUID leagueId, String leagueType,
            LeagueBoardCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        if (!leagueMemberRepository.existsByLeagueAndMember(league, member)) {
            throw new NotAllocatedLeagueException();
        }

        Board createdLeagueBoard = boardRepository.save(
                request.toEntity(league, member)
        );

        return isCreated(createdLeagueBoard);

    }

    @Override
    public List<BoardDto> getLeagueBoards(UUID leagueId, String leagueType, int pageNumber,
            String criteria) {

        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        if (league.getType().equals(LeagueType.MODEL) && !isAllocatedOfModelTypeLeague(league)) {
            throw new NotAllocatedLeagueException();
        }

        Pageable pageable = PageRequest.of(
                pageNumber, LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.valueOf(criteria).getCriteria())
        );

        List<LeagueBoard> leagueBoards = leagueBoardRepository
                .findAllByLeagueAndStatus(league, pageable, ActivateStatus.ACTIVE).getContent();

        return leagueBoards.stream()
                .map(leagueBoard -> mapper.map(leagueBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        LeagueBoard board = leagueBoardRepository.findByIdForUpdate(boardId, ActivateStatus.ACTIVE)
                .orElseThrow(NotExistBoardException::new);

        isAllocatedLeague(board.getLeague(), member);

        board.increaseViewCount();

        return LeagueBoardDetailResponse.of(mapper.map(board, LeagueBoardDetailDto.class));

    }

    @Override
    @Transactional(readOnly = true)
    public LeagueBoardLikeResponse getBoardLike(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        LeagueBoard board = leagueBoardRepository.getOrThrow(boardId);

        isAllocatedLeague(board.getLeague(), member);

        return LeagueBoardLikeResponse.of(board.getLikeCount(), isLike(member, board));

    }

    @Override
    @Transactional(readOnly = true)
    public List<ChannelBoardDto> getMentionLeagueBoards(
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

        List<ChannelBoard> mentionedChannelBoards = channelBoardRepository
                .findAllByMentionedLeague(mentionedLeague, ActivateStatus.ACTIVE, pageable);

        return mentionedChannelBoards.stream()
                .map(board -> mapper.map(board, ChannelBoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<BoardDto> search(UUID leagueId, String leagueType, String keyword, String condition,
            int pageNumber,
            String criteria) {

        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        SearchCondition searchCondition = SearchCondition.convertToEnum(condition);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        List<LeagueBoard> leagueBoards;
        switch (searchCondition.getCondition()) {

            case CONDITION_TITLE ->
                    leagueBoards = leagueBoardRepository
                            .findAllByLeagueAndTitleContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();
            case CONDITION_CONTENT ->
                    leagueBoards = leagueBoardRepository
                            .findAllByLeagueAndContentContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();
            case CONDITION_NICKNAME ->
                    leagueBoards = leagueBoardRepository
                            .findAllByLeagueAndMemberNicknameContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();

            default -> throw new InValidSearchConditionException();

        }

        return leagueBoards.stream()
                .map(leagueBoard -> mapper.map(leagueBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    private static void isEqualLeagueType(LeagueType reqeustType, LeagueType findLeagueType) {
        if (!reqeustType.equals(findLeagueType)) {
            throw new InvalidLeagueTypeException();
        }
    }

    private Boolean isAllocatedOfModelTypeLeague(League league) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new NotExistMemberException();
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof CustomUserDetails userDetails)) {
            throw new NotExistMemberException();
        }

        return leagueMemberRepository.existsByLeagueAndMember(
                league,
                memberRepository.getOrThrow(userDetails.getMember().getId())
        );

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
                .orElseThrow(() -> new FailToCreateBoardException());

        return createdLeagueBoard.getId();
    }

}