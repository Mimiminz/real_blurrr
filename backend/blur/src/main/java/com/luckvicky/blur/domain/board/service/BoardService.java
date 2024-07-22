package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.request.CreateBoardRequest;

public interface BoardService {
    Boolean createBoard(CreateBoardRequest request);
}
