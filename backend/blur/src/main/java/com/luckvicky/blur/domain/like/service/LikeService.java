package com.luckvicky.blur.domain.like.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import java.util.List;
import java.util.UUID;

public interface LikeService {

    Boolean createLike(UUID memberId, UUID boardId);

    Boolean deleteLike(UUID memberId, UUID boardId);

}
