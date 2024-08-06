package com.luckvicky.blur.domain.channelboard.controller;

import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.channelboard.model.dto.request.MyCarCreateRequest;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.security.AuthUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "내 차 자랑")
@RequestMapping("/v1/channels/mycar/boards")
@RestController
public class MyCarBoardController {

    private final BoardService boardService;

    public MyCarBoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @Operation(description = "내 차 자랑 게시글 생성")
    @PostMapping
    public ResponseEntity<Boolean> addMyCarBoard(
            @AuthUser ContextMember contextMember,
            @Valid @RequestBody MyCarCreateRequest myCarCreateRequest) {
        return ResponseEntity.ok(boardService.createBoard(myCarCreateRequest, contextMember.getId()));
    }
}
