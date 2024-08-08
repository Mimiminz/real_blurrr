package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import java.util.UUID;

public interface BoardService {

    Boolean createBoard(BoardCreateRequest request, UUID memberId);

    BoardDetailDto getBoardDetail(UUID boardId, UUID id);

    Boolean deleteBoard(UUID boardId, UUID memberId);

    void increaseViewCount(UUID boardId);
}
