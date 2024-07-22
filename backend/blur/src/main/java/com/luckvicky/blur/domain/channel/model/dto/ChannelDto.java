package com.luckvicky.blur.domain.channel.model.dto;

import com.luckvicky.blur.domain.channel.model.entity.Tags;

import java.util.List;
import java.util.UUID;

public record ChannelDto(
        UUID id,
        String name,
        String imgUrl,
        String info,
        UUID owner,
        List<Tags> tags
){
}
