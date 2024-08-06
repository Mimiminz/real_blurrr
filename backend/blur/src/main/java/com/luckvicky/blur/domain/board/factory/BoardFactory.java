package com.luckvicky.blur.domain.board.factory;

import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.member.model.entity.Member;

public interface BoardFactory {

    Board createBoard(BoardCreateRequest data, Member member);
}
