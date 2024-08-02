package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.mapper.ChannelBoardMapper;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.dashcam.repository.DashcamRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.luckvicky.blur.global.constant.Number.CHANNEL_BOARD_PAGE_SIZE;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelBoardServiceImpl implements ChannelBoardService {


    private final ModelMapper mapper;
    private final ChannelBoardMapper channelBoardMapper;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;
    private final ChannelBoardRepository channelBoardRepository;
    private final MentionRepository mentionRepository;
    private final LeagueRepository leagueRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ChannelBoardListDto> getChannelBoards(UUID channelId, String keyword, int pageNumber, String criteria) {
        Channel channel = channelRepository.getOrThrow(channelId);
        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);

        Pageable pageable = PageRequest.of(
                pageNumber, CHANNEL_BOARD_PAGE_SIZE,
                Sort.by(Sort.Direction.DESC, sortingCriteria.getCriteria())
        );


        Page<ChannelBoard> channelBoardPage;

        if (keyword == null || keyword.trim().isEmpty()) {
            channelBoardPage = channelBoardRepository.findAllByChannelAndStatus(
                    channel,
                    ActivateStatus.ACTIVE,
                    pageable
            );
        } else {
            channelBoardPage = channelBoardRepository.findAllByChannelAndStatusAndTitleContainingOrContentContaining(
                    channel,
                    ActivateStatus.ACTIVE,
                    keyword,
                    keyword,
                    pageable
            );
        }

        List<ChannelBoard> channelBoards = channelBoardPage.getContent();

        List<List<Mention>> mentionList = channelBoards.stream()
                .map(mentionRepository::findAllByBoard)
                .collect(Collectors.toList());

        return channelBoardMapper.toChannelBoardListDtoList(channelBoards, mentionList);

    }

    @Override
    @Transactional(readOnly = true)
    public ChannelBoardDetailDto getBoardDetail(UUID boardId) {


        ChannelBoard board = channelBoardRepository.findByIdWithCommentAndReply(boardId)
                .orElseThrow(NotExistBoardException::new);

        List<Mention> mentionedLeagues = mentionRepository.findAllByBoard(board);


        List<CommentDto> comments = board.getComments().stream()
                .filter(comment -> comment.getType().equals(CommentType.COMMENT))
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());


        return ChannelBoardDetailDto.of(board, MentionDto.of(mentionedLeagues), comments);


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
    public ChannelBoardDetailDto createChannelBoard(UUID channelId, ChannelBoardCreateRequest request, UUID memberId) {

        Channel channel = channelRepository.getOrThrow(channelId);
        Member member = memberRepository.getOrThrow(memberId);
        ChannelBoard channelBoard = channelBoardRepository.save(request.toEntity(channel, member));
        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());

        if (mentionedLeagues.size() != request.mentionedLeagueNames().size()) {
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

}
