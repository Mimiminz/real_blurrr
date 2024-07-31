package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    Page<ChannelBoard> findAllByChannelAndStatus(Channel channel, Pageable pageable, ActivateStatus status);
    Optional<ChannelBoard> findByIdAndChannel(UUID id, Channel channel);
}
