package com.luckvicky.blur.domain.dashcam.service;

import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.dto.response.DashcamBoardCreateResponse;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.UUID;


public interface DashcamBoardService {

    PaginatedResponse<DashcamBoardListDto> getDashcamBoards(String keyword, int pageNumber, String criteria);

    DashcamBoardDetailDto getDashcamBoardById(UUID id, ContextMember nullableMember);

    DashcamBoardCreateResponse createDashcamBoard(DashcamBoardCreateRequest request, UUID memberId);


}
