package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import java.util.List;
import java.util.UUID;

public interface ChannelBoardRetrieveService {


    List<HotBoardDto> getHotBoard();

    List<HotDashcamDto> getHotDashcamBoard();

    MyCarDto getTodayMyCarBoard();

    List<MyCarDto> getHotMyCarBoard();

}
