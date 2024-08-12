package com.luckvicky.blur.domain.leagueboard.repository;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LeagueBoardRepository extends JpaRepository<LeagueBoard, UUID> {

    default LeagueBoard getOrThrow(UUID id) {
        return findByIdAndStatus(id, ActivateStatus.ACTIVE).orElseThrow(NotExistBoardException::new);
    }

    @EntityGraph(attributePaths = {"member", "league"})
    Optional<LeagueBoard> findByIdAndStatus(UUID id, ActivateStatus status);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndStatus(League league, Pageable pageable, ActivateStatus status);

    @Query("SELECT lb "
            + "FROM LeagueBoard lb "
            + "INNER JOIN Like l ON l.board = lb AND l.member = :member "
            + "WHERE lb.member = :member AND lb.status = :status")
    Page<LeagueBoard> findAllByMemberAndLike(Member member, Pageable pageable, ActivateStatus status);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndStatusAndTitleContainingIgnoreCase(League league, ActivateStatus status, String title, Pageable pageable);

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByMemberAndStatus(Member member, ActivateStatus status, Pageable pageable);

}
