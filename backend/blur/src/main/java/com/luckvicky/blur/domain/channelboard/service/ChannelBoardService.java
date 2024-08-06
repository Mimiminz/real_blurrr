package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;

import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.List;
import java.util.UUID;

public interface ChannelBoardService {

    PaginatedResponse<ChannelBoardListDto> getChannelBoards(UUID channelId, String keyword, int pageNumber, String criteria);

    ChannelBoardDetailDto getBoardDetail(UUID boardId, ContextMember nullableMember);

    List<CommentDto> getComments(UUID boardId);

    ChannelBoardDetailDto createChannelBoard(UUID channelId, ChannelBoardCreateRequest request, UUID memberId, BoardType boardType);

}
