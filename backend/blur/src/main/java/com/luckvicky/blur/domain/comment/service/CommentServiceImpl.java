package com.luckvicky.blur.domain.comment.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_COMMENT;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_COMMENT;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.comment.exception.FailToCreateCommentException;
import com.luckvicky.blur.domain.comment.exception.NotExistCommentException;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    @Override
    public Boolean createComment(CommentCreateRequest request) {

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        Board board = boardRepository.findById(request.boardId())
                .orElseThrow(() -> new NotExistBoardException(NOT_EXIST_BOARD));

        Comment createdComment = commentRepository.save(request.toEntity(member, board));

        return isCreated(createdComment);

    }

    @Override
    public Boolean createCommentReply(UUID commentId, CommentReplyCreateRequest request) {

        Comment parentComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotExistCommentException(NOT_EXIST_COMMENT));

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        Board board = boardRepository.findById(request.boardId())
                .orElseThrow(() -> new NotExistBoardException(NOT_EXIST_BOARD));

        Comment createdComment = commentRepository.save(
                request.toEntity(parentComment, member, board)
        );

        return isCreated(createdComment);

    }

    private Boolean isCreated(Comment comment) {

        commentRepository.findById(comment.getId())
                .orElseThrow(() -> new FailToCreateCommentException(FAIL_TO_CREATE_COMMENT));

        return true;

    }

}
