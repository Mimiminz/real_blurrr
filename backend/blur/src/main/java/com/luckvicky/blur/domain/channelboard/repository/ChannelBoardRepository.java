package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChannelBoardRepository extends JpaRepository<ChannelBoard, UUID> {
    List<ChannelBoard> findByChannel (Channel channel);
    Optional<ChannelBoard> findByIdAndChannel(UUID id, Channel channel);
}
