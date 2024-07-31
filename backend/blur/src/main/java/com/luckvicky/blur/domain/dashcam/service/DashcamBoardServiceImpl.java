package com.luckvicky.blur.domain.dashcam.service;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.dashcam.exception.NotFoundDashcamException;
import com.luckvicky.blur.domain.dashcam.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.luckvicky.blur.global.constant.Number.DASHCAM_BOARD_PAGE_SIZE;

@Service
@RequiredArgsConstructor
public class DashcamBoardServiceImpl implements DashcamBoardService{

    private final ModelMapper mapper;

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final ChannelRepository channelRepository;
    private final DashcamRepository dashcamRepository;
    private final DashcamBoardMapper dashcamBoardMapper;
    private final CommentRepository commentRepository;
    private final LeagueRepository leagueRepository;
    private final MentionRepository mentionRepository;

    @Override
    @Transactional
    public DashcamBoardDetailDto createDashcamBoard(DashcamBoardCreateRequest request, UUID memberId) {

        Channel dashcamChannel = channelRepository.findByNameIs(BoardType.DASHCAM.getName())
                .orElseThrow(NotExistChannelException::new);

        Member member = memberRepository.getOrThrow(memberId);
        DashCam dashcam = request.toEntity(dashcamChannel, member);
        dashcam = dashcamRepository.save(dashcam);

        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());

        if(mentionedLeagues.size() != request.mentionedLeagueNames().size()){
            throw new NotExistLeagueException();
        }

        for (League league : mentionedLeagues) {
            mentionRepository.save(Mention.builder()
                    .board(dashcam)
                    .league(league)
                    .build()
            );
        }

        List<CommentDto> comments = new ArrayList<>();

        return dashcamBoardMapper.toDashcamBoardDetailDto(dashcam, comments);
    }


    @Override
    @Transactional(readOnly = true)
    public List<DashcamBoardListDto> getDashcamBoards(int pageNumber, String criteria) {

        Pageable pageable = PageRequest.of(
                pageNumber, DASHCAM_BOARD_PAGE_SIZE,
                Sort.by(Sort.Direction.DESC, SortingCriteria.valueOf(criteria).getCriteria())
                );

        List<DashCam> dashCamBoards = dashcamRepository.findAllByStatus(pageable, ActivateStatus.ACTIVE).getContent();

        return dashcamBoardMapper.toDashcamBoardListDtos(dashCamBoards);
    }

    @Override
    public DashcamBoardDetailDto getDashcamBoardById(UUID id) {
        DashCam dashcam = dashcamRepository.findById(id)
                .orElseThrow(NotFoundDashcamException::new);

        List<CommentDto> comments = commentRepository.findAllByBoardAndType(dashcam, CommentType.COMMENT)
                .stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        return dashcamBoardMapper.toDashcamBoardDetailDto(dashcam,comments);
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

}
