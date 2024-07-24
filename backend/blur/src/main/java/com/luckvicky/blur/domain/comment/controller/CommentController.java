package com.luckvicky.blur.domain.comment.controller;

import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentReplyCreateRequest;
import com.luckvicky.blur.domain.comment.service.CommentService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(
            summary = "댓글 작성 API",
            description = "사용자와 게시글 고유 식별자를 받아 댓글을 생성한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "생성 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자, 게시글에 의해 생성 실패"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "DB 저장 실패"
            )
    })
    @PostMapping
    public ResponseEntity createComment(
            @RequestBody CommentCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(commentService.createComment(request))
                        .build()
        );

    }

    @Operation(
            summary = "대댓글 작성 API",
            description = "댓글, 사용자, 게시글 고유 식별자를 받아 대댓글을 생성한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "생성 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자, 게시글, 댓글에 의해 생성 실패"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "DB 저장 실패"
            )
    })
    @PostMapping("/{commentId}")
    @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH)
    public ResponseEntity creatCommentReply(
            @PathVariable(name = "commentId") UUID commentId,
            @RequestBody CommentReplyCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(commentService.createCommentReply(commentId, request))
                        .build()
        );

    }

}
