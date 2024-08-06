package com.luckvicky.blur.domain.mycar.service;

import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.mycar.model.resp.SimpleMyCar;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface MyCarBoardService {
    Slice<SimpleMyCar> findMyCars(Pageable page);
    Boolean createMyCarBoard(BoardCreateRequest request, UUID memberId);
}
