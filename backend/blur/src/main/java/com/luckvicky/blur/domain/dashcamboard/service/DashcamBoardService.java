package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.request.DashcamBoardCreateRequest;

import java.util.List;
import java.util.UUID;


public interface DashcamBoardService {
    List<DashcamBoardListDto> getDashcamBoards();
    DashcamBoardDto getDashcamBoardById(UUID id);
    DashcamBoardDto createDashcamBoard(DashcamBoardCreateRequest request);
    List<CommentDto> getComments(UUID boardId);
    void deleteDashcamBoard(UUID id);
}
