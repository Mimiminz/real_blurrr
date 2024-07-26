package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;

import java.util.List;

public interface ChannelService {
    ChannelDto createChannel(ChannelCreateRequest request);
    List<ChannelDto> getAllChannels();
    List<ChannelDto> searchChannelsByTags(List<String> tagNames);
}
