package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import java.util.List;
import java.util.UUID;

public interface LeagueBoardService {

    UUID createLeagueBoard(UUID leagueId, UUID id, LeagueBoardCreateRequest request);

    List<ChannelBoardDto> getMentionLeagueBoards(UUID leagueId, int pageNumber, String criteria);

    List<BoardDto> getLeagueBoards(UUID leagueId, int pageNumber, String criteria);

    BoardDetailDto getLeagueBoardDetail(ContextMember member, UUID boardId);

    List<BoardDto> search(UUID leagueId, String keyword, String condition, int pageNumber, String criteria);

}