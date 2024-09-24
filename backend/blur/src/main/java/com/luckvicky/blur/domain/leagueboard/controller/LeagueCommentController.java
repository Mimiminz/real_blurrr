package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueCommentCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueReplyCreateRequest;
import com.luckvicky.blur.domain.leagueboard.service.LeagueCommentService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 댓글 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueCommentController {


    private final LeagueCommentService leagueCommentService;

    @Operation(summary = "댓글 작성 API", description = "사용자와 게시글 고유 식별자를 받아 댓글을 생성한다.")
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    })
    @PostMapping("/{leagueId}/boards/{boardId}/comments")
    public ResponseEntity<Result<Boolean>> createComment(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable("boardId") UUID boardId,
            @RequestBody @Valid LeagueCommentCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.of(leagueCommentService.createComment(
                        member.getId(), leagueId, boardId, request)
                )
        );

    }

    @Operation(summary = "대댓글 작성 API", description = "댓글, 사용자, 게시글 고유 식별자를 받아 대댓글을 생성한다.")
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH)
    })
    @PostMapping("/{leagueId}/boards/{boardId}/comments/{commentId}")
    public ResponseEntity<Result<Boolean>> createReply(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable("boardId") UUID boardId,
            @PathVariable(name = "commentId") UUID commentId,
            @RequestBody @Valid LeagueReplyCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.of(
                        leagueCommentService.createReply(member.getId(), leagueId, boardId, commentId, request)
                )
        );

    }

    @Operation(summary = "댓글 삭제 API", description = "댓글, 게시글 고유 식별값을 받아 일치하는 댓글을 삭제한다.")
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "commentId", description = "댓글 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    })
    @DeleteMapping("/{leagueId}/comments/{commentId}/boards/{boardId}")
    public ResponseEntity<Result<Boolean>> deleteComment(
            @AuthUser ContextMember member,
            @PathVariable("leagueId") UUID leagueId,
            @PathVariable(name = "commentId") UUID commentId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.of(
                        leagueCommentService.deleteComment(member.getId(), leagueId, commentId, boardId)
                )
        );

    }

}