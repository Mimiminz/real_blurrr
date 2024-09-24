package com.luckvicky.blur.domain.board.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.response.BoardDetailResponse;
import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.comment.service.CommentService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.NullableAuthUser;
import com.luckvicky.blur.global.util.CookieUtil;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardRetrieveController {

    private final BoardService boardService;
    private final CommentService commentService;

    @Operation(
            summary = "게시글 상세 조회 API",
            description = "특정 게시글에 대한 본문 및 조회수를 조회한다."
    )
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{boardId}")
    public ResponseEntity<Result<BoardDetailResponse>> getBoardDetail(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        BoardDetailDto boardDetail = boardService.getBoardDetail(member.getId(), boardId);

        return ResponseUtil.ok(
                Result.of(BoardDetailResponse.of(boardDetail))
        );
    }

    @Operation(
            summary = "게시글 조회수 증가 API",
            description = "특정 게시글의 조회수를 증가시킨다.(1분내 조회수 증가 중복 방지)"
    )
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{boardId}/view")
    public ResponseEntity<Result<Void>> viewCountIncrease(
            @PathVariable(name = "boardId") UUID boardId,
            @NullableAuthUser ContextMember nullableMember,
            HttpServletRequest request, HttpServletResponse response) {

        String cookieName = boardId.toString();
        String cookieValue = CookieUtil.getCookieValue(request, cookieName);

        if (cookieValue == null){
            boolean increased = boardService.increaseViewCount(boardId, nullableMember);

            if(increased){
                CookieUtil.setCookieValue(response, cookieName, "viewed",60);
            }
        }

        return ResponseUtil.ok(Result.empty());
    }

    @Operation(
            summary = "게시글 댓글 목록 조회 API",
            description = "특정 게시글에 작성된 댓글 목록을 조회한다."
    )
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{boardId}/comments")
    public ResponseEntity<Result<CommentListResponse>> getComments(
            @PathVariable(name = "boardId") UUID boardId
    ) {
        // FIXME: 리그 코멘트는 해당 API 사용 불가, 리그 게시글에 대해 댓글 조회시, 리그 멤버인지 검증 안함
        return ResponseUtil.ok(
                Result.of(commentService.findCommentsByBoard(boardId))
        );
    }

}
