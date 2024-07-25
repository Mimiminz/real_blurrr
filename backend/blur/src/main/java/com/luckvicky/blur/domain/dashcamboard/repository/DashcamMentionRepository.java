package com.luckvicky.blur.domain.dashcamboard.repository;

import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.model.entity.DashcamMention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DashcamMentionRepository extends JpaRepository<DashcamMention, UUID> {
    List<DashcamMention> findByDashcam(Dashcam dashcam);
    void deleteAllByDashcam(Dashcam dashcam);
}
