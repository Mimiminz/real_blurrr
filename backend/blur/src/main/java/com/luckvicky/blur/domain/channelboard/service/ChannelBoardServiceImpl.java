package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channelboard.mapper.ChannelBoardMapper;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardMentionDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoardMention;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardMentionRepository;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.dashcamboard.model.entity.DashcamMention;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.code.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelBoardServiceImpl implements ChannelBoardService{

    private final ModelMapper mapper;
    private final ChannelBoardMapper channelBoardMapper;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;
    private final ChannelBoardRepository channelBoardRepository;
    private final ChannelBoardMentionRepository channelBoardMentionRepository;
    private final LeagueRepository leagueRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    @Override
    public List<ChannelBoardListDto> getChannelBoards(UUID channelId) {
        Channel channel = channelRepository.getOrThrow(channelId);

        List<ChannelBoard> channelBoards = channelBoardRepository.findByChannel(channel);
        List<List<ChannelBoardMention>> mentionList = channelBoards.stream()
                .map(channelBoardMentionRepository::findByChannelBoard)
                .collect(Collectors.toList());

        return channelBoardMapper.toChannelBoardListDtoList(channelBoards, mentionList);

    }

    @Override
    @Transactional(readOnly = true)
    public BoardDetailDto getBoardDetail(UUID boardId) {

        Board board = boardRepository.getOrThrow(boardId);

        List<CommentDto> comments = board.getComments().stream()
                .filter(comment -> comment.getType().equals(CommentType.COMMENT))
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        return BoardDetailDto.of(board.getContent(), board.getViewCount(), comments);

    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDto> getComments(UUID boardId) {

        Board board = boardRepository.getOrThrow(boardId);

        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return  comments.stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public ChannelBoardDto createChannelBoard(UUID channelId, ChannelBoardCreateRequest request, UUID memberId) {
        Channel channel = channelRepository.getOrThrow(channelId);

        Member member = memberRepository.getOrThrow(memberId);

        ChannelBoard channelBoard = request.toEntity(channel, member);
        channelBoard = channelBoardRepository.save(channelBoard);

        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());

        if(mentionedLeagues.size() != request.mentionedLeagueNames().size()){
            throw new NotExistLeagueException();
        }

        for (League league : mentionedLeagues) {
            ChannelBoardMention mention = ChannelBoardMention.builder()
                    .channelBoard(channelBoard)
                    .league(league)
                    .build();
            channelBoardMentionRepository.save(mention);
        }

        return channelBoardMapper.toChannelBoardDto(channelBoard);
    }


}
