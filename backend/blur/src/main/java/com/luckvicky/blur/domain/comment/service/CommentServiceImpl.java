package com.luckvicky.blur.domain.comment.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_COMMENT;

import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import com.luckvicky.blur.domain.alarm.service.AlarmFacade;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.comment.exception.FailToCreateCommentException;
import com.luckvicky.blur.domain.comment.exception.FailToDeleteCommentException;
import com.luckvicky.blur.domain.comment.exception.NotExistCommentException;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.infra.redisson.DistributedLock;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final ModelMapper mapper;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final LeagueBoardRepository leagueBoardRepository;
    private final AlarmFacade alarmService;

    @Override
    public Boolean createComment(UUID memberId, CommentCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.findByIdForUpdate(request.boardId())
                .orElseThrow(NotExistBoardException::new);

        Comment createdComment = commentRepository.save(
                request.toEntity(member, board)
        );

        alarmService.sendAlarm(memberId, AlarmType.ADD_COMMENT, board.getTitle());
        increaseCommentCount(board);

        return isCreated(createdComment);

    }

    @Override
    public Boolean createReply(UUID memberId, UUID commentId, ReplyCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        Comment parentComment = commentRepository.getOrThrow(commentId);
        Board board = boardRepository.findByIdForUpdate(request.boardId())
                .orElseThrow(NotExistBoardException::new);

        Comment createdComment = commentRepository.save(
                request.toEntity(parentComment, member, board)
        );

        alarmService.sendAlarm(memberId, AlarmType.ADD_COMMENT, board.getTitle());
        increaseCommentCount(board);

        return isCreated(createdComment);

    }

    @Override
    public Boolean deleteComment(UUID commentId, UUID boardId) {

        Board board = boardRepository.findByIdForUpdate(boardId)
                .orElseThrow(NotExistBoardException::new);

        Comment comment = commentRepository.findByIdAndBoard(commentId, board)
                .orElseThrow(NotExistCommentException::new);

        comment.inactive();
        decreaseCommentCount(board);

        return isDeleted(comment);

    }

    @Transactional(readOnly = true)
    public CommentListResponse findCommentsByLeagueBoard(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        LeagueBoard board = leagueBoardRepository.getOrThrow(boardId);

        leagueMemberRepository.existsByLeagueAndMember(board.getLeague(), member);

        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return CommentListResponse.of(
                comments.stream()
                        .map(comment -> mapper.map(comment, CommentDto.class))
                        .collect(Collectors.toList()),
                board.getCommentCount()
        );

    }

    @Transactional(readOnly = true)
    public CommentListResponse findCommentsByBoard(UUID boardId) {
        // TODO: 리그 type 일 경우 exception 던지기 필요
        Board board = boardRepository.getOrThrow(boardId);
        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return CommentListResponse.of(
                comments.stream()
                        .map(comment -> mapper.map(comment, CommentDto.class))
                        .collect(Collectors.toList()),
                board.getCommentCount()
        );

    }

    @DistributedLock(value = "#boardId")
    private static void increaseCommentCount(Board board) {
        board.increaseCommentCount();
    }

    @DistributedLock(value = "#boardId")
    private static void decreaseCommentCount(Board board) {
        board.decreaseCommentCount();
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
