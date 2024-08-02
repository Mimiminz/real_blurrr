package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.repository.query.Param;

public interface ChannelBoardRepository extends JpaRepository<ChannelBoard, UUID> {

    List<ChannelBoard> findByChannel (Channel channel);


    @Query("SELECT b "
            + "FROM ChannelBoard b "
            + "LEFT JOIN FETCH b.comments c "
            + "LEFT JOIN FETCH b.member m "
            + "WHERE b.id = :id"
    )
    Optional<ChannelBoard> findByIdWithCommentAndReply(UUID id);

    @EntityGraph(attributePaths = "member")
    Page<ChannelBoard> findAllByChannelAndStatusAndTitleContainingOrContentContaining(
            Channel channel,
            ActivateStatus status,
            String titleKeyword,
            String contentKeyword,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "member")
    Page<ChannelBoard> findAllByChannelAndStatus(
            Channel channel,
            ActivateStatus status,
            Pageable pageable
    );

    Optional<ChannelBoard> findByIdAndChannel(UUID id, Channel channel);

//    @Query("SELECT b "
//            + "FROM Board b "
//            + "LEFT JOIN Mention mt ON mt.board.id = b.id AND mt.league = :league "
//            + "LEFT JOIN FETCH b.member "
//            + "WHERE b.status = :status AND b.type =: type")
//    List<Board> findAllByTypeAndMentionedLeague(
//            @Param("league") League league,
//            @Param("type") BoardType type,
//            @Param("status") ActivateStatus status,
//            Pageable pageable
//    );

    @Query("SELECT cb "
            + "FROM ChannelBoard cb "
            + "LEFT JOIN Mention m ON m.board = cb AND m.league = :league "
            + "LEFT JOIN FETCH cb.channel "
            + "WHERE cb.status = :status ")
    List<ChannelBoard> findAllByMentionedLeague(
            @Param("league") League league,
            @Param("status") ActivateStatus status,
            Pageable pageable
    );

}
