package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.mapper.ChannelMapper;
import com.luckvicky.blur.domain.channel.model.dto.req.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.req.TagDto;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import com.luckvicky.blur.domain.channel.repository.ChannelTagRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService{

    private final ChannelsRepository channelsRepository;
    private final ChannelTagRepository channelTagRepository;
    private final ChannelMapper channelMapper;

    @Override
    public List<ChannelDto> getAllChannels(){
        List<Channel> channels = channelsRepository.findAll();
        List<UUID> channelIds = channels.stream()
                .map(Channel::getId)
                .collect(Collectors.toList());

        List<ChannelTag> channelTags = channelTagRepository.findByChannelIdIn(channelIds);

        Map<UUID, List<Tag>> channelTagsMap = channelTags.stream()
                .collect(Collectors.groupingBy(
                        ct -> ct.getChannel().getId(),
                        Collectors.mapping(ChannelTag::getTag, Collectors.toList())
                ));

        return channels.stream()
                .map(channel -> channelMapper.convertToDto(channel,
                        channelTagsMap.getOrDefault(channel.getId(), Collections.emptyList())))
                .collect(Collectors.toList());
    }

    @Override
    public List<ChannelDto> searchChannelsByTags(List<String> tagNames) {
        List<ChannelTag> channelTags = channelTagRepository.findByTagNameIn(tagNames);

        return channelTags.stream()
                .collect(Collectors.groupingBy(
                        ChannelTag::getChannel,
                        Collectors.mapping(ChannelTag::getTag, Collectors.toList())
                ))
                .entrySet().stream()
                .map(entry -> channelMapper.convertToDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }


}
