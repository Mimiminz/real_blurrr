package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChannelTagRepository extends JpaRepository<ChannelTag, UUID> {
    List<ChannelTag> findByChannelIdIn(List<UUID> channelIds);
    List<ChannelTag> findByTagNameIn(List<String> tagNames);
    List<ChannelTag> findByChannelId(UUID channelId);
}
