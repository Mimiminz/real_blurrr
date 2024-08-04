package com.luckvicky.blur.domain.like.controller;

import static com.luckvicky.blur.global.constant.ErrorMessage.*;

import com.luckvicky.blur.domain.like.service.LikeService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "좋아요 API")
@RestController
@RequestMapping("/v1/likes")
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
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "404", description = NOT_EXIST_MEMBER_MESSAGE + "or" + NOT_EXIST_BOARD_MESSAGE),
            @ApiResponse(responseCode = "500", description = FAIL_TO_CREATE_LIKE_MESSAGE)
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
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(
                    responseCode = "404",
                    description = NOT_EXIST_MEMBER_MESSAGE + "or"
                            + NOT_EXIST_BOARD_MESSAGE + "or"
                            + NOT_EXIST_LIKE_MESSAGE
            ),
            @ApiResponse(responseCode = "500", description = FAIL_TO_DELETE_LIKE_MESSAGE)
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
