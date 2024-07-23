package com.luckvicky.blur.domain.leagueboard.repository;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueBoardRepository extends JpaRepository<LeagueBoard, Long> {

    List<LeagueBoard> findByLeague(League league);

}
