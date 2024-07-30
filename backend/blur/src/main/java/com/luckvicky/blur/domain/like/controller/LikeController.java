package com.luckvicky.blur.domain.like.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.response.HotBoardResponse;
import com.luckvicky.blur.domain.like.model.response.LikeBoardListResponse;
import com.luckvicky.blur.domain.like.service.LikeService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "좋아요 API")
@RestController
@RequestMapping("/v1/members")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @Operation(
            summary = "좋아요 생성",
            description = "사용자, 게시글 고유 식별값을 받아 좋아요 생성"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "좋아요 생성 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자, 게시글"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "DB 저장 실패"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/boards/{boardId}")
    public ResponseEntity createLike(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(likeService.createLike(member.getId(), boardId))
                        .build()
        );

    }

    @Operation(
            summary = "좋아요 삭제",
            description = "사용자, 게시글 고유 식별값을 받아 좋아요 삭제"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "좋아요 삭제 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자, 게시글, 좋아요"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "DB 삭제 실패"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @DeleteMapping("/boards/{boardId}")
    public ResponseEntity deleteLike(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.builder()
                        .data(likeService.deleteLike(member.getId(), boardId))
                        .build()
        );

    }


}
