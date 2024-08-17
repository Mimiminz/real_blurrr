package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.mapper.ChannelBoardMapper;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardResponse;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.service.RedisViewCounterService;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.luckvicky.blur.global.constant.Number.GENERAL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelBoardServiceImpl implements ChannelBoardService {

    private final ModelMapper mapper;
    private final ChannelBoardMapper channelBoardMapper;
    private final RedisViewCounterService redisViewCounterService;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;
    private final ChannelBoardRepository channelBoardRepository;
    private final MentionRepository mentionRepository;
    private final LeagueRepository leagueRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;


    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ChannelBoardListDto> getChannelBoards(UUID channelId, String keyword, Pageable pageable) {
        Channel channel = channelRepository.getOrThrow(channelId);

        Page<ChannelBoard> channelBoardPage = channelBoardRepository.findAllByKeywordAndChannel(pageable, ActivateStatus.ACTIVE, keyword, channel);

        List<ChannelBoard> channelBoards = channelBoardPage.getContent();

        List<List<Mention>> mentionList = channelBoards.stream()
                .map(mentionRepository::findAllByBoard)
                .collect(Collectors.toList());

        List<ChannelBoardListDto> channelBoardListDtos = channelBoardMapper.toChannelBoardListDtoList(channelBoards, mentionList);

        return PaginatedResponse.of(
                channelBoardPage.getNumber(),
                channelBoardPage.getSize(),
                channelBoardPage.getTotalElements(),
                channelBoardPage.getTotalPages(),
                channelBoardListDtos
        );

    }

    @Override
    @Transactional(readOnly = true)
    public ChannelBoardDetailDto getBoardDetail(UUID boardId, ContextMember nullableMember) {


        ChannelBoard board = channelBoardRepository.findById(boardId)
                .orElseThrow(NotExistBoardException::new);

        boolean isLiked = false;
        if(Objects.nonNull(nullableMember)){
            isLiked = isLike(nullableMember.getId(),board);
        }

        List<Mention> mentionedLeagues = mentionRepository.findAllByBoard(board);

        return ChannelBoardDetailDto.of(
                board,
                board.getViewCount() + redisViewCounterService.increment(board.getId()),
                MentionDto.of(mentionedLeagues),
                isLiked);

    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDto> getComments(UUID boardId) {

        Board board = boardRepository.getOrThrow(boardId);

        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return comments.stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public ChannelBoardDetailDto createChannelBoard(UUID channelId, ChannelBoardCreateRequest request, UUID memberId, BoardType boardType) {

        Channel channel = channelRepository.getOrThrow(channelId);
        Member member = memberRepository.getOrThrow(memberId);
        ChannelBoard channelBoard = channelBoardRepository.save(request.toEntity(channel, member));
        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.getMentionedLeagueNames());

        if (mentionedLeagues.size() != request.getMentionedLeagueNames().size()) {
            throw new NotExistLeagueException();
        }

        for (League league : mentionedLeagues) {
            mentionRepository.save(
                    Mention.builder()
                            .board(channelBoard)
                            .league(league)
                            .build()
            );
        }

        return channelBoardMapper.toChannelBoardDto(channelBoard);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ChannelBoardResponse> findChannelBoardByLike(UUID id, int pageNumber) {

        Member member = memberRepository.getOrThrow(id);

        Pageable pageable = PageRequest.of(
                pageNumber,
                GENERAL_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.TIME.getCriteria())
        );

        Page<ChannelBoard> likeBoards = channelBoardRepository.findAllByMemberAndLike(member, pageable, ActivateStatus.ACTIVE);

        return PaginatedResponse.of(
                likeBoards.getNumber(),
                likeBoards.getSize(),
                likeBoards.getTotalElements(),
                likeBoards.getTotalPages(),
                likeBoards.stream()
                        .map(channelBoard ->
                            ChannelBoardResponse.of(
                                    channelBoard, MentionDto.of(mentionRepository.findAllByBoard(channelBoard))
                            )
                        )
                        .collect(Collectors.toList())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<ChannelBoardResponse> findMyBoard(UUID memberId, int pageNumber) {

        Member member = memberRepository.getOrThrow(memberId);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.TIME.getCriteria())
        );

        Page<ChannelBoard> myBoards = channelBoardRepository.findAllByMemberAndStatus(member, ActivateStatus.ACTIVE, pageable);

        return PaginatedResponse.of(
                myBoards.getNumber(),
                myBoards.getSize(),
                myBoards.getTotalElements(),
                myBoards.getTotalPages(),
                myBoards.stream()
                        .map(channelBoard ->
                                ChannelBoardResponse.of(
                                        channelBoard, MentionDto.of(mentionRepository.findAllByBoard(channelBoard))
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    private boolean isLike(UUID memberId, Board board) {
        var member = memberRepository.getOrThrow(memberId);
        return likeRepository.existsByMemberAndBoard(member, board);
    }

}
