package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueMentionListResponse;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.UUID;

public interface LeagueBoardService {

    LeagueBoardCreateResponse createLeagueBoard(UUID memberId, UUID leagueId, String leagueType, LeagueBoardCreateRequest request);

    PaginatedResponse<LeagueMentionListResponse> getMentionLeagueBoards(UUID leagueId, UUID memberId, int pageNumber, String criteria);

    LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId);

    PaginatedResponse<LeagueBoardResponse> getLeagueBoards(ContextMember contextMember, UUID leagueId, String leagueType, int pageNumber, String criteria);

    PaginatedResponse<LeagueBoardResponse> findLeagueBoardByLike(UUID id, int pageNumber);

    PaginatedResponse<LeagueBoardResponse> findMyBoard(UUID id, int pageNumber);
}