package com.luckvicky.blur.domain.channel.mapper;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class ChannelMapper {

    public static ChannelDto convertToDto(Channel channel) {
        return ChannelDto.builder()
                .id(channel.getId())
                .name(channel.getName())
                .imgUrl(channel.getImgUrl())
                .info(channel.getInfo())
                .owner(channel.getOwner().getId().toString())
                .tags(channel.getTags().stream()
                        .map(TagDto::of)
                        .collect(Collectors.toList()))
                .followCount(channel.getFollowCount())
                .isFollowed(null)
                .build();
    }

}
