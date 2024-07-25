package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import java.util.List;
import java.util.UUID;

public interface LeagueBoardService {

    Boolean createLeagueBoard(UUID leagueId, LeagueBoardCreateRequest request);

    List<BoardDto> getLeagueBoards(UUID leagueId);

    LeagueBoardDetailResponse getLeagueBoardDetail(UUID boardId);

}