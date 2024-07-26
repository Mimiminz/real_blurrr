package com.luckvicky.blur.domain.comment.controller;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.comment.service.CommentService;
import com.luckvicky.blur.global.model.dto.Result;
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
    @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{commentId}")
    public ResponseEntity createReply(
            @PathVariable(name = "commentId") UUID commentId,
            @RequestBody ReplyCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(commentService.createReply(commentId, request))
                        .build()
        );

    }

    @Operation(
            summary = "댓글 목록 조회 API",
            description = "게시글에 작성된 모든 댓글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = CommentListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 게시글"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/boards/{boardId}")
    public ResponseEntity findCommentsByBoard(
            @PathVariable(name = "boardId") UUID boardId
    ) {

        List<CommentDto> comments = commentService.findCommentsByBoard(boardId);

        return ResponseUtil.ok(
                Result.builder()
                        .data(CommentListResponse.of(comments))
                        .build()
        );

    }


    @Operation(
            summary = "댓글 삭제 API",
            description = "댓글, 게시글 고유 식별값을 받아 일치하는 댓글을 삭제한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 댓글, 게시글"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "DB 삭제 실패"
            ),
    })
    @Parameters({
            @Parameter(name = "commentId", description = "댓글 고유 식별값"),
            @Parameter(name = "boardId", description = "게시글 고유 식별값")
    })
    @PutMapping("/{commentId}/boards/{boardId}")
    public ResponseEntity deleteComment(
            @PathVariable(name = "commentId") UUID commentId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.builder()
                        .data(commentService.deleteComment(commentId, boardId))
                        .build()
        );

    }

}
