package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.entity.Channels;

import java.util.List;

public interface ChannelService {
    List<ChannelDto> getAllChannels();
}
