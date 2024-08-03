package com.luckvicky.blur.domain.leagueboard.controller;

import static com.luckvicky.blur.global.constant.ErrorMessage.*;

import com.luckvicky.blur.domain.comment.model.dto.request.CommentCreateRequest;
import com.luckvicky.blur.domain.comment.model.dto.request.ReplyCreateRequest;
import com.luckvicky.blur.domain.comment.service.CommentService;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueCommentCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueReplyCreateRequest;
import com.luckvicky.blur.domain.leagueboard.service.LeagueCommentService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 댓글 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueCommentController {


    private final LeagueCommentService leagueCommentService;

    @Operation(
            summary = "댓글 작성 API",
            description = "사용자와 게시글 고유 식별자를 받아 댓글을 생성한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "생성 완료"
            ),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(
                    responseCode = "404",
                    description = NOT_EXIST_MEMBER_MESSAGE + "or" + NOT_EXIST_BOARD_MESSAGE
            ),
            @ApiResponse(responseCode = "500", description = FAIL_TO_CREATE_COMMENT_MESSAGE)
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    })
    @PostMapping("/{leagueId}/boards/{boardId}/comments")
    public ResponseEntity createComment(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable("boardId") UUID boardId,
            @RequestBody LeagueCommentCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(leagueCommentService.createComment(
                                member.getId(), leagueId, boardId, request)
                        )
                        .build()
        );

    }

    @Operation(
            summary = "대댓글 작성 API",
            description = "댓글, 사용자, 게시글 고유 식별자를 받아 대댓글을 생성한다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "생성 완료"),
            @ApiResponse(responseCode = "404", description = FAIL_TO_CREATE_COMMENT_MESSAGE),
            @ApiResponse(responseCode = "500", description = FAIL_TO_CREATE_COMMENT_MESSAGE)
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH)
    })
    @PostMapping("/{leagueId}/boards/{boardId}/comments/{commentId}")
    public ResponseEntity createReply(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable("boardId") UUID boardId,
            @PathVariable(name = "commentId") UUID commentId,
            @RequestBody LeagueReplyCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(leagueCommentService.createReply
                                (member.getId(), leagueId, boardId, commentId, request)
                        )
                        .build()
        );

    }

    @Operation(
            summary = "댓글 삭제 API",
            description = "댓글, 게시글 고유 식별값을 받아 일치하는 댓글을 삭제한다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "삭제 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 댓글, 게시글"),
            @ApiResponse(responseCode = "500", description = "DB 삭제 실패"),
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    })
    @PutMapping("/{leagueId}/comments/{commentId}/boards/{boardId}")
    public ResponseEntity deleteComment(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable(name = "commentId") UUID commentId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.builder()
                        .data(
                                leagueCommentService
                                        .deleteComment(member.getId(), leagueId, commentId, boardId)
                        )
                        .build()
        );

    }

}