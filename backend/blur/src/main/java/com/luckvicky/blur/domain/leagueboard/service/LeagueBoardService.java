package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import java.util.List;
import java.util.UUID;
import javax.naming.directory.InvalidSearchControlsException;

public interface LeagueBoardService {

    Boolean createLeagueBoard(UUID leagueId, LeagueBoardCreateRequest request);

    List<BoardDto> getLeagueBoards(UUID leagueId, int pageNumber, String criteria);

    BoardDetailDto getLeagueBoardDetail(UUID boardId);

    List<BoardDto> search(UUID leagueId, String keyword, String condition, int pageNumber, String criteria);

}