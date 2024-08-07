package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.LeagueBoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueMentionListResponse;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.UUID;

public interface LeagueBoardService {

    LeagueBoardCreateResponse createLeagueBoard(UUID memberId, UUID leagueId, String leagueType, LeagueBoardCreateRequest request);

    PaginatedResponse<LeagueMentionListResponse> getMentionLeagueBoards(UUID leagueId, UUID memberId, int pageNumber, String criteria);

    LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId);

    PaginatedResponse<LeagueBoardDto> search(UUID leagueId, String leagueType, String keyword, String condition, int pageNumber, String criteria);

    PaginatedResponse<LeagueBoardListResponse> getLeagueBoards(ContextMember contextMember, UUID leagueId, String leagueType, int pageNumber, String criteria);

}