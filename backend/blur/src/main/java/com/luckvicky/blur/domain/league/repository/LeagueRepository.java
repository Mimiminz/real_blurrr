package com.luckvicky.blur.domain.league.repository;

import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.vote.model.entity.Option;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository<League, UUID> {


    default League getOrThrow(UUID id) {
        return findById(id).orElseThrow(NotExistLeagueException::new);
    }

    Optional<League> findByName(String name);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT l FROM League l WHERE l.name = :name")
    Optional<League> findByNameForUpdate(@Param("name") String name);

    List<League> findAllByTypeOrderByPeopleCountDesc(LeagueType type);

    List<League> findAllByNameIn(List<String> names);

    List<League> findAllByNameContainingIgnoreCase(String keyword);

}
