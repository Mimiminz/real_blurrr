package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.dashcamboard.exception.NotFoundDashcamException;
import com.luckvicky.blur.domain.dashcamboard.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.model.entity.DashcamMention;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamMentionRepository;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashcamBoardServiceImpl implements DashcamBoardService{


    private final ModelMapper mapper;
    private final DashcamRepository dashcamRepository;
    private final BoardRepository boardRepository;
    private final DashcamBoardMapper dashcamBoardMapper;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final DashcamMentionRepository dashcamMentionRepository;
    private final CommentRepository commentRepository;

    @Override
    public List<DashcamBoardListDto> getDashcamBoards() {
        List<Dashcam> dashcams = dashcamRepository.findAll();
        return dashcamBoardMapper.toDashcamBoardListDtos(dashcams);
    }

    @Override
    public DashcamBoardDetailDto getDashcamBoardById(UUID id) {
        Dashcam dashcam = dashcamRepository.findById(id)
                .orElseThrow(NotFoundDashcamException::new);

        List<CommentDto> comments = commentRepository.findAllByBoardAndType(dashcam, CommentType.COMMENT)
                .stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        return dashcamBoardMapper.toDashcamBoardDetailDto(dashcam,comments);
    }

    @Override
    @Transactional
    public DashcamBoardDetailDto createDashcamBoard(DashcamBoardCreateRequest request) {
        Member member = memberRepository.getOrThrow(request.memberId());

        Dashcam dashcam = request.toEntity(member);
        dashcam = dashcamRepository.save(dashcam);


        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());

        if(mentionedLeagues.size() != request.mentionedLeagueNames().size()){
            throw new NotExistLeagueException(ErrorCode.NOT_EXIST_LEAGUE);
        }
        for (League league : mentionedLeagues) {
            DashcamMention mention = DashcamMention.builder()
                    .dashcam(dashcam)
                    .league(league)
                    .build();
            dashcamMentionRepository.save(mention);
        }

        List<CommentDto> comments = new ArrayList<>();

        return dashcamBoardMapper.toDashcamBoardDetailDto(dashcam, comments);
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
    @Transactional
    public void deleteDashcamBoard(UUID id) {
        Dashcam dashcam = dashcamRepository.findById(id)
                .orElseThrow(NotFoundDashcamException::new);

        dashcamMentionRepository.deleteAllByDashcam(dashcam);

        dashcamRepository.deleteById(id);
    }
}
