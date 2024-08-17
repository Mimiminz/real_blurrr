package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.leagueboard.service.LeagueLikeService;
import com.luckvicky.blur.domain.like.model.dto.response.LikeCreateResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeDeleteResponse;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 좋아요 API")
@RestController
@RequestMapping("/v1/leagues/likes")
@RequiredArgsConstructor
public class LeagueLikeController {

    private final LeagueLikeService leagueLikeService;

    @Operation(summary = "좋아요 생성", description = "사용자, 게시글 고유 식별값을 받아 좋아요 생성")
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/boards/{boardId}")
    public ResponseEntity<Result<LikeCreateResponse>> createLike(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.created(
                Result.of(leagueLikeService.createLike(member.getId(), boardId))
        );

    }

    @Operation(summary = "좋아요 삭제", description = "사용자, 게시글 고유 식별값을 받아 좋아요 삭제")
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity<Result<LikeDeleteResponse>> deleteLike(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.of(leagueLikeService.deleteLike(member.getId(), boardId))
        );

    }

}
