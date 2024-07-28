package com.luckvicky.blur.domain.comment.service;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import java.util.List;
import java.util.UUID;

public interface CommentService {

    Boolean createComment(CommentCreateRequest request);

    Boolean createReply(UUID uuid, ReplyCreateRequest request);

    Boolean deleteComment(UUID commentId, UUID boardId);

}
