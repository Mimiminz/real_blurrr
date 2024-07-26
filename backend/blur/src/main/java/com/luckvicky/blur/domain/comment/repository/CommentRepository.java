package com.luckvicky.blur.domain.comment.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.comment.exception.NotExistCommentException;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    default Comment getOrThrow(UUID id) {
        return findById(id).orElseThrow(NotExistCommentException::new);
    }

    List<Comment> findAllByBoardAndTypeAndStatus(
            @Param("board") Board board,
            @Param("type") CommentType type,
            @Param("status") ActivateStatus status
    );

    Optional<Comment> findByIdAndBoard(UUID commentId, Board board);

}
