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
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
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

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

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

        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return comments.stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

    }

    private Boolean isCreated(Comment comment) {

        commentRepository.findById(comment.getId())
                .orElseThrow(() -> new FailToCreateCommentException(FAIL_TO_CREATE_COMMENT));

        return true;

    }

}
