package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardLikeResponse;
import java.util.List;
import java.util.UUID;

public interface LeagueBoardService {

    UUID createLeagueBoard(UUID memberId, UUID leagueId, String leagueType, LeagueBoardCreateRequest request);

    List<ChannelBoardDto> getMentionLeagueBoards(UUID leagueId, UUID memberId, int pageNumber, String criteria);

    LeagueBoardDetailResponse getLeagueBoardDetail(UUID memberId, UUID boardId);

    LeagueBoardLikeResponse getBoardLike(UUID memberId, UUID boardId);

    List<BoardDto> search(UUID leagueId, String leagueType, String keyword, String condition, int pageNumber, String criteria);

    List<BoardDto> getLeagueBoards(UUID leagueId, String leagueType, int pageNumber, String criteria);

}