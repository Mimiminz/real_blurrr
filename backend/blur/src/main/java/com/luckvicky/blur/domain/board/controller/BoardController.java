package com.luckvicky.blur.domain.board.controller;

import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @Operation(summary = "게시글 생성 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "게시글 생성 실패"
            )
    })
    @PostMapping
    public ResponseEntity createBoard(@RequestBody BoardCreateRequest request, @AuthUser ContextMember member) {
//        return ResponseUtil.created(
//                Result.builder()
//                        .data(boardService.createBoard(request))
//                        .build()
//        );
        return null;
    }


    @Operation(summary = "게시글 삭제 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "게시글 삭제 실패"
            )
    })
    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteBoard(@PathVariable UUID boardId, @AuthUser ContextMember contextMember) {
        return ResponseUtil.created(
                Result.builder()
                        .data(boardService.deleteBoard(boardId, contextMember.getId()))
                        .build()
        );

    }


}
