package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;

import java.util.List;

public interface ChannelService {
    List<ChannelDto> getAllChannels();
    List<ChannelDto> searchChannelsByTags(List<String> tagNames);
}
