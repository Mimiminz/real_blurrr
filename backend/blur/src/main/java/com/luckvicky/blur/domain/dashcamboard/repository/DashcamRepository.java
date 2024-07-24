package com.luckvicky.blur.domain.dashcamboard.repository;

import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DashcamRepository extends JpaRepository<Dashcam, UUID> {
}
