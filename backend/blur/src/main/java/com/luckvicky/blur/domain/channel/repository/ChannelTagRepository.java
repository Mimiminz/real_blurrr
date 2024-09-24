package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelTagRepository extends JpaRepository<ChannelTag, UUID> {
    List<ChannelTag> findByTagNameContainingIgnoreCase(String keyword);
}
