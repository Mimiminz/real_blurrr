package com.luckvicky.blur.domain.like.service;

import com.luckvicky.blur.domain.like.model.dto.response.LikeCreateResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeDeleteResponse;
import java.util.UUID;

public interface LikeService {

    LikeCreateResponse createLike(UUID memberId, UUID boardId);

    LikeDeleteResponse deleteLike(UUID memberId, UUID boardId);

}
