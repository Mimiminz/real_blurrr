package com.luckvicky.blur.domain.channelboard.service;

import com.luckvicky.blur.domain.channelboard.model.dto.response.HotDashCamResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotBoardResponse;
import java.util.List;

public interface MainPageService {

    List<HotBoardResponse> getHotBoard();

    List<HotDashCamResponse> getHotDashcamBoard();

    TodayMyCarResponse getTodayMyCarBoard();

    List<HotMyCarResponse> getHotMyCarBoard();

}
