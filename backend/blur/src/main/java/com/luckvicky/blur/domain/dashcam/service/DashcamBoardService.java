package com.luckvicky.blur.domain.dashcam.service;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.request.DashcamBoardCreateRequest;

import com.luckvicky.blur.domain.dashcam.model.dto.response.DashcamBoardCreateResponse;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import java.util.List;
import java.util.UUID;


public interface DashcamBoardService {

    List<DashcamBoardListDto> getDashcamBoards(int pageNumber, SortingCriteria criteria);

    DashcamBoardDetailDto getDashcamBoardById(UUID id);

    DashcamBoardCreateResponse createDashcamBoard(DashcamBoardCreateRequest request, UUID memberId);


}
