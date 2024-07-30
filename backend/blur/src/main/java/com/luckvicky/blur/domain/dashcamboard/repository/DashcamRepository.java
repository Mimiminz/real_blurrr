package com.luckvicky.blur.domain.dashcamboard.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DashcamRepository extends JpaRepository<Dashcam, UUID> {
    Page<Dashcam> findAll(Pageable pageable);

    @EntityGraph(attributePaths = "member")
    Page<Dashcam> findAllByStatus(Pageable pageable, ActivateStatus status);
}
