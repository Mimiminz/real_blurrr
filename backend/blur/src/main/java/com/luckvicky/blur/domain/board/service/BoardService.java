package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateDto;
import java.util.List;

public interface BoardService {
    Boolean createBoard(BoardCreateDto request);
    List<BoardDto> searchBoardByBoardType(String boardType);
}
