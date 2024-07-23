package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import java.util.List;

public interface BoardService {

    Boolean createBoard(BoardCreateRequest request);

    List<BoardDto> findBoardByType(String boardType);

}
