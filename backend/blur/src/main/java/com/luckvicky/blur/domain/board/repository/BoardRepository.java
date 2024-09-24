package com.luckvicky.blur.domain.board.repository;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.infra.redisson.DistributedLock;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;

public interface BoardRepository extends JpaRepository<Board, UUID> {

    default Board getOrThrow(UUID id) {
        return findById(id).orElseThrow(NotExistBoardException::new);
    }

    @Query("SELECT b "
            + "FROM Board b "
            + "LEFT JOIN FETCH b.comments c "
            + "WHERE b.id = :id ")
    Optional<Board> findByIdWithCommentAndReply(@Param("id") UUID id);

    @EntityGraph(attributePaths = "member")
    Page<Board> findAllByMember(Member member, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Board b WHERE b.id = :id")
    Optional<Board> findByIdForUpdate(@Param("id") UUID id);

    @Modifying
    @DistributedLock(value = "#boardId")
    @Query("UPDATE Board b "
            + "SET b.viewCount = b.viewCount + :count "
            + "WHERE b.id = :boardId ")
    void updateViewCount(
            @Param("boardId") UUID boardId,
            @Param("count") long count
    );

}
