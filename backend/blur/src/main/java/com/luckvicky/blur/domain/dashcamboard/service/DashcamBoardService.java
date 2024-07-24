package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;

import java.util.List;
import java.util.UUID;


public interface DashcamBoardService {
    List<DashcamBoardListDto> getDashcamBoards();
    DashcamBoardDto getDashcamBoardById(UUID id);
}
