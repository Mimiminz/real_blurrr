package com.luckvicky.blur.domain.board.service;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import java.util.UUID;

public interface BoardService {

    Boolean createBoard(BoardCreateRequest request, UUID memberId);

    BoardDetailDto getBoardDetail(UUID boardId, UUID id);

    Boolean deleteBoard(UUID boardId, UUID memberId);
//
//    PaginatedResponse<LikeBoardListResponse> findLikeBoardsByMember(UUID id, int pageNumber, String criteria);
//
//    PaginatedResponse<MyBoardListResponse> findMyBoard(UUID id, int pageNumber, String criteria);

    boolean increaseViewCount(UUID boardId, ContextMember nullableMember);
}
