package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;

import java.util.List;
import java.util.UUID;

public interface ChannelBoardService {

    List<BoardDto> getChannelBoard(UUID channelId);
}
