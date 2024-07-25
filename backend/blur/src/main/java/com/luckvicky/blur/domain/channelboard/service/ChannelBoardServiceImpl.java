package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.global.enums.code.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelBoardServiceImpl implements ChannelBoardService{

    private final ModelMapper mapper;
    private final ChannelRepository channelRepository;
    private final ChannelBoardRepository channelBoardRepository;

    @Override
    public List<BoardDto> getChannelBoard(UUID channelId) {

        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(()-> new NotExistChannelException(ErrorCode.NOT_EXIST_CHANNEL));

        List<ChannelBoard> channelBoards = channelBoardRepository.findByChannel(channel);

        return channelBoards.stream()
                .map(channelboard -> mapper.map(channelboard, BoardDto.class))
                .collect(Collectors.toList());
    }
}
