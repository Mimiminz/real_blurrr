package com.luckvicky.blur.domain.leagueboard.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeagueBoardRepository extends JpaRepository<LeagueBoard, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT lb "
            + "FROM LeagueBoard lb "
            + "LEFT JOIN FETCH lb.league "
            + "WHERE lb.id = :id")
    Optional<LeagueBoard> findByIdForUpdate(@Param("id") UUID id);

    @Query("SELECT lb "
            + "FROM LeagueBoard lb "
            + "LEFT JOIN FETCH lb.comments c "
            + "LEFT JOIN FETCH lb.member m "
            + "LEFT JOIN FETCH lb.league l "
            + "WHERE lb.id = :id AND lb.status = :status")
    Optional<LeagueBoard> findByIdWithCommentAndReply(@Param("id") UUID id, @Param("status") ActivateStatus status);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndStatus(League league, Pageable pageable, ActivateStatus status);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndTitleContainingIgnoreCase(League league, String title, Pageable pageable);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndContentContainingIgnoreCase(League league, String title, Pageable pageable);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndMemberNicknameContainingIgnoreCase(League league, String nickname, Pageable pageable);

}
