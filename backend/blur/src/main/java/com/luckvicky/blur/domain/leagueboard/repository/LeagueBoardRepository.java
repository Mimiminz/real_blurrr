package com.luckvicky.blur.domain.leagueboard.repository;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueBoardRepository extends JpaRepository<LeagueBoard, Long> {

    @EntityGraph(attributePaths = "member")
    Page<LeagueBoard> findAllByLeagueAndStatus(League league, Pageable pageable, ActivateStatus status);

}
