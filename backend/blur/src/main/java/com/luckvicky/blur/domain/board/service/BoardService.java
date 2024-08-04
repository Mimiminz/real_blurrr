package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import java.util.List;
import java.util.UUID;

public interface BoardService {

    Boolean createBoard(BoardCreateRequest request);

    BoardDetailDto getBoardDetail(UUID boardId, UUID id);

    Boolean deleteBoard(UUID boardId, UUID memberId);

    List<BoardDto> findLikeBoardsByMember(UUID id, int pageNumber, String criteria);

    List<BoardDto> findBoardsByMember(UUID id, int pageNumber, String criteria);

    void increaseViewCount(UUID boardId);
}