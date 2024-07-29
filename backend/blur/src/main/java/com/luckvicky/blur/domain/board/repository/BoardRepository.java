package com.luckvicky.blur.domain.board.repository;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import jakarta.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, UUID> {

    default Board getOrThrow(UUID id) {
        return findById(id).orElseThrow(NotExistBoardException::new);
    }

    @Query("SELECT b "
            + "FROM Board b "
            + "LEFT JOIN FETCH b.comments c "
            + "LEFT JOIN FETCH b.member m "
            + "WHERE b.id = :id"
    )
    Optional<Board> findByIdWithCommentAndReply(UUID id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Board b WHERE b.id = :id")
    Optional<Board> findByIdForUpdate(@Param("id") UUID id);

    @EntityGraph(attributePaths = "member")
    Page<Board> findAllByTypeAndStatus(BoardType type, Pageable pageable, ActivateStatus status);

    Page<Board> findAllByTypeAndStatusAndCreatedAtBetween(
            BoardType type, Pageable pageable, ActivateStatus status, LocalDateTime startDate, LocalDateTime endDate
    );

}
