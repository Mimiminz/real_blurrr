package com.luckvicky.blur.domain.dashcam.repository;

import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DashcamRepository extends JpaRepository<DashCam, UUID> {

    Page<DashCam> findAll(Pageable pageable);

    @EntityGraph(attributePaths = "member")
    Page<DashCam> findAllByStatus(Pageable pageable, ActivateStatus status);

    @Query("SELECT d "
            + "FROM DashCam d "
            + "LEFT JOIN Mention m ON m.board = d AND m.league = :league "
            + "LEFT JOIN FETCH d.channel "
            + "WHERE d.status = :status ")
    List<DashCam> findAllByMentionedLeague(
            @Param("league") League league,
            @Param("status") ActivateStatus status,
            Pageable pageable
    );

}
