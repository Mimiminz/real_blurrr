package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueCommentCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueReplyCreateRequest;
import java.util.UUID;

public interface LeagueCommentService {

    Boolean createComment(UUID id, UUID leagueId, UUID boardId, LeagueCommentCreateRequest request);

    Boolean createReply(UUID uuid, UUID leagueId, UUID boardId, UUID commentId, LeagueReplyCreateRequest request);

    Boolean deleteComment(UUID memberId, UUID commentId, UUID leagueId, UUID boardId);

    CommentListResponse findCommentsByLeagueBoard(UUID memberId, UUID leagueId, UUID boardId);

}
