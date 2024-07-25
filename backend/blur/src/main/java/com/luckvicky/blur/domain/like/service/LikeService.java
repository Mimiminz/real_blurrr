package com.luckvicky.blur.domain.like.service;

import java.util.UUID;

public interface LikeService {
    Boolean createLike(UUID memberId, UUID boardId);
    Boolean deleteLike(UUID memberId, UUID boardId);
}
