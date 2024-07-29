package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;

import java.util.List;
import java.util.UUID;

public interface ChannelBoardService {

    List<ChannelBoardListDto> getChannelBoards(UUID channelId);

    BoardDetailDto getBoardDetail(UUID boardId);

    List<CommentDto> getComments(UUID boardId);

    ChannelBoardDto createChannelBoard(UUID channelId, ChannelBoardCreateRequest request, UUID memberId);
}
