package com.luckvicky.blur.domain.mycar.service;

import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.mycar.model.resp.MyCarDetail;
import com.luckvicky.blur.domain.mycar.model.resp.MyCarSimple;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MyCarBoardService {
    Page<MyCarSimple> findMyCars(Pageable page, String keyword);
    Boolean createMyCarBoard(BoardCreateRequest request, UUID memberId);
    MyCarDetail findMyCarDetail(UUID boardId, ContextMember memberId);
//    void increaseView(UUID boardId);
}
