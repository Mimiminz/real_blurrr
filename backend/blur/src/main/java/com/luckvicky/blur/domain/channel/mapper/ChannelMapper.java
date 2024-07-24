package com.luckvicky.blur.domain.channel.mapper;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChannelMapper {

    public static ChannelDto convertToDto(Channel channel, List<Tag> tags) {
        return ChannelDto.builder()
                .id(channel.getId())
                .name(channel.getName())
                .imgUrl(channel.getImgUrl())
                .info(channel.getInfo())
                .owner(channel.getOwner().toString())
                .tags(tags.stream()
                        .map(TagDto::from)
                        .collect(Collectors.toList()))
                .build();
    }
}
