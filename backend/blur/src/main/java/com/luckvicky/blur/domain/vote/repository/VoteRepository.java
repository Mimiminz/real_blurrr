package com.luckvicky.blur.domain.vote.repository;

import com.luckvicky.blur.domain.vote.model.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VoteRepository extends JpaRepository<Vote, UUID> {

    Optional<Vote> findByMemberIdAndDashCamId(UUID memberId, UUID boardId);

    boolean existsByDashCamIdAndMemberId(UUID boardId, UUID memberId);
}
