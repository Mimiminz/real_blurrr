package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import java.util.List;
import java.util.UUID;

public interface BoardService {

    Boolean createBoard(BoardCreateRequest request);

    List<BoardDto> findBoardsByType(String boardType, int pageNumber, String criteria);

    BoardDetailDto getBoardDetail(UUID boardId);

    List<CommentDto> getComments(UUID boardId);

}