package com.luckvicky.blur.domain.comment.controller;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.comment.service.CommentService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "댓글 API")
@RestController
@RequestMapping("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "댓글 작성 API", description = "사용자와 게시글 고유 식별자를 받아 댓글을 생성한다.")
    @PostMapping
    public ResponseEntity<Result<Boolean>> createComment(
            @AuthUser ContextMember member,
            @RequestBody @Valid CommentCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.of(commentService.createComment(member.getId(), request))
        );

    }

    @Operation(summary = "대댓글 작성 API", description = "댓글, 사용자, 게시글 고유 식별자를 받아 대댓글을 생성한다.")
    @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{commentId}")
    public ResponseEntity<Result<Boolean>> createReply(
            @AuthUser ContextMember member,
            @PathVariable(name = "commentId") UUID commentId,
            @RequestBody @Valid ReplyCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.of(commentService.createReply(member.getId(), commentId, request))
        );

    }

    @Operation(summary = "댓글 삭제 API", description = "댓글, 게시글 고유 식별값을 받아 일치하는 댓글을 삭제한다.")
    @Parameters({
            @Parameter(name = "commentId", description = "댓글 고유 식별값"),
            @Parameter(name = "boardId", description = "게시글 고유 식별값")
    })
    @PutMapping("/{commentId}/boards/{boardId}")
    public ResponseEntity<Result<Boolean>> deleteComment(
            @PathVariable(name = "commentId") UUID commentId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(Result.of(commentService.deleteComment(commentId, boardId)));

    }

}
