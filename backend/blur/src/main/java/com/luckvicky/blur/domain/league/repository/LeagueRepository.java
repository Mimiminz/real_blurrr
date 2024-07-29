package com.luckvicky.blur.domain.league.repository;

import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository<League, UUID> {

    default League getOrThrow(UUID leagueId) {
        return findById(leagueId).orElseThrow(NotExistLeagueException::new);
    }

    Optional<List<League>> findAllByType(LeagueType type);
    List<League> findAllByNameIn(List<String> names);


}
