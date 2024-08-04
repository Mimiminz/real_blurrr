package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.like.model.dto.response.LikeCreateResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeDeleteResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeStatusResponse;
import java.util.UUID;

public interface LeagueLikeService {

    LikeCreateResponse createLike(UUID memberId, UUID boardId);

    LikeDeleteResponse deleteLike(UUID memberId, UUID boardId);

    LikeStatusResponse getLikeStatusByBoard(UUID memberId, UUID boardId);

}
