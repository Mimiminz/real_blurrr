package com.luckvicky.blur.domain.comment.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_COMMENT;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.comment.exception.FailToCreateCommentException;
import com.luckvicky.blur.domain.comment.exception.FailToDeleteCommentException;
import com.luckvicky.blur.domain.comment.exception.NotExistCommentException;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final ModelMapper mapper;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    @Override
    public Boolean createComment(CommentCreateRequest request) {

        Member member = memberRepository.getOrThrow(request.memberId());
        Board board = boardRepository.findByIdForUpdate(request.boardId())
                .orElseThrow(NotExistBoardException::new);

        board.increaseCommentCount();
        Comment createdComment = commentRepository.save(
                request.toEntity(member, board)
        );

        return isCreated(createdComment);

    }

    @Override
    public Boolean createReply(UUID commentId, ReplyCreateRequest request) {

        Comment parentComment = commentRepository.getOrThrow(commentId);
        Member member = memberRepository.getOrThrow(request.memberId());
        Board board = boardRepository.findByIdForUpdate(request.boardId())
                .orElseThrow(NotExistBoardException::new);

        board.increaseCommentCount();
        Comment createdComment = commentRepository.save(
                request.toEntity(parentComment, member, board)
        );

        return isCreated(createdComment);

    }

    @Override
    public List<CommentDto> findCommentsByBoard(UUID boardId) {

        Board board = boardRepository.getOrThrow(boardId);

        List<Comment> comments = commentRepository
                .findAllByBoardAndTypeAndStatus(board, CommentType.COMMENT, ActivateStatus.ACTIVE);

        List<CommentDto> commentDtos = comments.stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        commentDtos.forEach(comment ->
            comment.getReply()
                    .removeIf(reply ->
                            reply.getStatus().equals(ActivateStatus.INACTIVE)
                    )
        );

        return commentDtos;

    }

    @Override
    public Boolean deleteComment(UUID commentId, UUID boardId) {

        Board board = boardRepository.findByIdForUpdate(boardId)
                .orElseThrow(NotExistBoardException::new);

        Comment comment = commentRepository.findByIdAndBoard(commentId, board)
                .orElseThrow(NotExistCommentException::new);

        board.decreaseCommentCount();
        comment.inactive();

        return isDeleted(comment);

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
