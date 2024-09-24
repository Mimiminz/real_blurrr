package com.luckvicky.blur.domain.comment.service;

import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import java.util.UUID;

public interface CommentService {

    Boolean createComment(UUID id, CommentCreateRequest request);

    Boolean createReply(UUID uuid, UUID commentId, ReplyCreateRequest request);

    Boolean deleteComment(UUID commentId, UUID boardId);

    CommentListResponse findCommentsByLeagueBoard(UUID memberId, UUID boardId);

    CommentListResponse findCommentsByBoard(UUID boardId);

}
