package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.entity.Channels;
import com.luckvicky.blur.domain.channel.repository.ChannelsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService{

    private final ModelMapper mapper;
    private final ChannelsRepository channelsRepository;

    @Override
    public List<ChannelDto> getAllChannels(){
        List<Channels> channels = channelsRepository.findAll();

        List<ChannelDto> channelDtos = channels.stream()
                .map(channel -> mapper.map(channel, ChannelDto.class))
                .collect(Collectors.toList());

        return channelDtos;
    }


}
