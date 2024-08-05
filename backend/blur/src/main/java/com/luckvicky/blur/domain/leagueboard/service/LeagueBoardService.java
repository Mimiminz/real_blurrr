package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardLikeResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.MentionLeagueListResponse;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import java.util.UUID;

public interface LeagueBoardService {

    LeagueBoardCreateResponse createLeagueBoard(UUID memberId, UUID leagueId, String leagueType, LeagueBoardCreateRequest request);

    MentionLeagueListResponse getMentionLeagueBoards(UUID leagueId, UUID memberId, int pageNumber, String criteria);

    LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId);

    LeagueBoardLikeResponse getBoardLike(UUID memberId, UUID boardId);

    LeagueBoardListResponse search(UUID leagueId, String leagueType, String keyword, String condition, int pageNumber, String criteria);

    LeagueBoardListResponse getLeagueBoards(ContextMember contextMember, UUID leagueId, String leagueType, int pageNumber, String criteria);

}