package com.luckvicky.blur.domain.comment.service;

import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentReplyCreateRequest;
import java.util.UUID;

public interface CommentService {
    Boolean createComment(CommentCreateRequest request);
    Boolean createCommentReply(UUID uuid, CommentReplyCreateRequest request);
}
