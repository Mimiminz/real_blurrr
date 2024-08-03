package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_COMMENT;

import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import com.luckvicky.blur.domain.alarm.service.AlarmFacade;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.comment.exception.FailToCreateCommentException;
import com.luckvicky.blur.domain.comment.exception.FailToDeleteCommentException;
import com.luckvicky.blur.domain.comment.exception.NotExistCommentException;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueCommentCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueReplyCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.leaguemember.exception.NotAllocatedLeagueException;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.execption.UnauthorizedAccessException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LeagueCommentServiceImpl implements LeagueCommentService {

    private final ModelMapper mapper;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final LeagueBoardRepository leagueBoardRepository;
    private final AlarmFacade alarmService;
    private final LeagueRepository leagueRepository;

    @Override
    public Boolean createComment(UUID memberId, UUID leagueId, UUID boardId,
            LeagueCommentCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);
        isAllocatedLeague(league, member);

        LeagueBoard board = leagueBoardRepository.findByIdForUpdate(boardId, ActivateStatus.ACTIVE)
                .orElseThrow(NotExistBoardException::new);
        isEqualLeague(league, board);

        board.increaseCommentCount();

        Comment createdComment = commentRepository.save(
                request.toEntity(member, board)
        );

        alarmService.sendAlarm(memberId, AlarmType.ADD_COMMENT, board.getTitle());

        return isCreated(createdComment);

    }

    @Override
    public Boolean createReply(UUID memberId, UUID leagueId, UUID boardId, UUID commentId,
            LeagueReplyCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);
        isAllocatedLeague(league, member);

        LeagueBoard board = leagueBoardRepository.findByIdForUpdate(boardId, ActivateStatus.ACTIVE)
                .orElseThrow(NotExistBoardException::new);

        Comment parentComment = commentRepository.findByIdAndBoard(commentId, board)
                .orElseThrow(NotExistCommentException::new);
        isEqualLeague(league, board);

        board.increaseCommentCount();

        Comment createdComment = commentRepository.save(
                request.toEntity(parentComment, member, board)
        );

        alarmService.sendAlarm(memberId, AlarmType.ADD_COMMENT, board.getTitle());

        return isCreated(createdComment);

    }

    private static void isEqualLeague(League league, LeagueBoard board) {
        if (!league.equals(board.getLeague())) {
            throw new UnauthorizedAccessException();
        }
    }

    @Override
    public Boolean deleteComment(UUID memberId, UUID leagueId, UUID commentId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);
        isAllocatedLeague(league, member);

        LeagueBoard board = leagueBoardRepository.findByIdForUpdate(boardId, ActivateStatus.ACTIVE)
                .orElseThrow(NotExistBoardException::new);

        Comment comment = commentRepository.findByIdAndBoard(commentId, board)
                .orElseThrow(NotExistCommentException::new);
        isEqualLeague(league, board);

        board.decreaseCommentCount();
        comment.inactive();

        return isDeleted(comment);

    }

    @Transactional(readOnly = true)
    public CommentListResponse findCommentsByLeagueBoard(UUID memberId, UUID leagueId,
            UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);
        isAllocatedLeague(league, member);

        LeagueBoard board = leagueBoardRepository.getOrThrow(boardId);
        isEqualLeague(league, board);

        List<Comment> comments = commentRepository.findAllByBoardAndType(board,
                CommentType.COMMENT);

        return CommentListResponse.of(
                comments.stream()
                        .map(comment -> mapper.map(comment, CommentDto.class))
                        .collect(Collectors.toList()),
                board.getCommentCount()
        );

    }

    private void isAllocatedLeague(League league, Member member) {

        if (Boolean.FALSE
                .equals(leagueMemberRepository
                        .existsByLeagueAndMember(league, member)
                )
        ) {

            throw new NotAllocatedLeagueException();

        }

    }

    private Boolean isCreated(Comment comment) {

        commentRepository.findById(comment.getId())
                .orElseThrow(() -> new FailToCreateCommentException(FAIL_TO_CREATE_COMMENT));

        return true;

    }

    private Boolean isDeleted(Comment comment) {

        if (!comment.getStatus().equals(ActivateStatus.INACTIVE)) {
            throw new FailToDeleteCommentException();
        }

        return true;

    }

}