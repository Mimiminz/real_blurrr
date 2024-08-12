package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChannelBoardRepository extends JpaRepository<ChannelBoard, UUID>, ChannelBoardSearchRepository {

    List<ChannelBoard> findByChannel (Channel channel);


    @Query("SELECT b "
            + "FROM ChannelBoard b "
            + "LEFT JOIN FETCH b.comments c "
            + "LEFT JOIN FETCH b.member m "
            + "WHERE b.id = :id"
    )
    Optional<ChannelBoard> findByIdWithCommentAndReply(UUID id);


    @Query("SELECT cb "
            + "FROM ChannelBoard cb "
            + "INNER JOIN Like l ON l.board = cb AND l.member = :member "
            + "WHERE cb.member = :member AND cb.status = :status")
    Page<ChannelBoard> findAllByMemberAndLike(Member member, Pageable pageable, ActivateStatus status);

    @Query("SELECT cb "
            + "FROM ChannelBoard cb "
            + "INNER JOIN Mention m ON cb = m.board AND m.league = :league "
            + "LEFT JOIN FETCH cb.channel "
            + "WHERE cb.status = :status ")
    Page<ChannelBoard> findAllByMentionedLeague(
            @Param("league") League league,
            @Param("status") ActivateStatus status,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "member")
    Page<ChannelBoard> findAllByAndStatusAndCreatedAtBetween(
            Pageable pageable, ActivateStatus status, LocalDateTime startDate, LocalDateTime endDate
    );

    @EntityGraph(attributePaths = "member")
    Page<ChannelBoard> findAllByMemberAndStatus(Member member, ActivateStatus activateStatus, Pageable pageable);

}
