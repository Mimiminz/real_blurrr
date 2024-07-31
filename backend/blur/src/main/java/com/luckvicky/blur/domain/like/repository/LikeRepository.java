package com.luckvicky.blur.domain.like.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.like.model.entity.Like;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByMemberAndBoard(Member member, Board board);

    Boolean existsByMemberIdAndBoardId(UUID memberId, UUID boardId);

}
