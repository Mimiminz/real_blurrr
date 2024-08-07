package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.channelboard.model.dto.response.HotDashCamListResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotMyCarListResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotBoardListResponse;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import org.springframework.data.domain.Page;

public interface ChannelBoardRetrieveService {


    PaginatedResponse<HotBoardListResponse> getHotBoard();

    PaginatedResponse<HotDashCamListResponse> getHotDashcamBoard();

    TodayMyCarResponse getTodayMyCarBoard();

    PaginatedResponse<HotMyCarListResponse> getHotMyCarBoard();

}
