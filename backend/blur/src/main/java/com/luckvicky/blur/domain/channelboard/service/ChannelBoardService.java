package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;

import java.util.List;
import java.util.UUID;

public interface ChannelBoardService {

    List<ChannelBoardListDto> getChannelBoards(UUID channelId);
}
