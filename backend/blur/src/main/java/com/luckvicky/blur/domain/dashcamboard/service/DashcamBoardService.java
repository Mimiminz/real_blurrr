package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;

import java.util.List;


public interface DashcamBoardService {
    List<DashcamBoardListDto> getDashcamBoards();
}
