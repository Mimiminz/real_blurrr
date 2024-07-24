package com.luckvicky.blur.domain.dashcamboard.controller;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.response.DashcamBoardListResponse;
import com.luckvicky.blur.domain.dashcamboard.model.dto.response.DashcamBoardResponse;
import com.luckvicky.blur.domain.dashcamboard.service.DashcamBoardService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Tag(name = "블랙박스 게시글 API")
@RestController
@RequestMapping("channels/dashcams")
@RequiredArgsConstructor
public class DashcamBoardController {

    private final DashcamBoardService dashcamBoardService;

    @Operation(summary = "블랙박스 게시글 목록 조회 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = DashcamBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "게시글 없음"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "게시글 목록 조회 실패"
            )
    })
    @GetMapping
    public ResponseEntity getDashcamBoards(){
        List<DashcamBoardListDto> boardDtos = dashcamBoardService.getDashcamBoards();

        if (Objects.isNull(boardDtos) || boardDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(DashcamBoardListResponse.of(boardDtos))
                        .build()
        );

    }
    @Operation(summary = "블랙박스 게시글 상세 조회 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = DashcamBoardResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "게시글 없음"
            )
    })
    @GetMapping("/{boardId}")
    public ResponseEntity getDashcamBoard(
            @Parameter(description = "게시글 ID", required = true) @PathVariable("boardId") UUID id){
        try {
            DashcamBoardDto boardDto = dashcamBoardService.getDashcamBoardById(id);
            return ResponseUtil.ok(
                    Result.builder()
                            .data(DashcamBoardResponse.of(boardDto))
                            .build()
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(
                    Result.builder()
                            .build(),
                    HttpStatus.NOT_FOUND
            );
        }

    }
}
