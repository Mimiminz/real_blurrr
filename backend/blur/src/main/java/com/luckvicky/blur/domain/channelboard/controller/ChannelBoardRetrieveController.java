package com.luckvicky.blur.domain.channelboard.controller;

import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import com.luckvicky.blur.domain.board.model.dto.response.HotBoardResponse;
import com.luckvicky.blur.domain.board.model.dto.response.HotDashcamResponse;
import com.luckvicky.blur.domain.board.model.dto.response.HotMyCarResponse;
import com.luckvicky.blur.domain.board.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardRetrieveService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채널 게시글 API")
@RestController
@RequestMapping("/v1/channels")
@RequiredArgsConstructor
public class ChannelBoardRetrieveController {

    private final ChannelBoardRetrieveService channelBoardRetrieveService;

    @Operation(
            summary = "HOT 게시판 조회 API",
            description = "최근 1주일 동안 가장 좋아요를 많이 받은 10개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotBoardResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/hot")
    public ResponseEntity getHotBoard() {

        List<HotBoardDto> boardDtos = channelBoardRetrieveService.getHotBoard();

        if (Objects.isNull(boardDtos) || boardDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotBoardResponse.of(boardDtos))
                        .build()
        );

    }

    @Operation(
            summary = "HOT 블랙박스 게시판 조회 API",
            description = "최근 1주일 동안 가장 투표를 많이 받은 5개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotDashcamResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/dashcam")
    public ResponseEntity getHotDashcamBoard() {

        List<HotDashcamDto> dashcamDtos = channelBoardRetrieveService.getHotDashcamBoard();

        if (Objects.isNull(dashcamDtos) || dashcamDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotDashcamResponse.of(dashcamDtos))
                        .build()
        );

    }

    @Operation(
            summary = "HOT 차자랑 게시판 조회 API",
            description = "최근 1주일 동안 가장 조회수가 높은 많이 받은 20개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotMyCarResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/mycar")
    public ResponseEntity getHotMyCarBoard() {

        List<MyCarDto> mycarDtos = channelBoardRetrieveService.getHotMyCarBoard();

        if (Objects.isNull(mycarDtos) || mycarDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotMyCarResponse.of(mycarDtos))
                        .build()
        );

    }

    @Operation(
            summary = "오늘의차 조회 API",
            description = "어제 차자랑 게시글 중 가장 좋아요가 높았던 1개 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = TodayMyCarResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/today/mycar")
    public ResponseEntity geTodayMyCarBoard() {

        MyCarDto todayMyCar = channelBoardRetrieveService.getTodayMyCarBoard();

        if (Objects.isNull(todayMyCar)) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(TodayMyCarResponse.of(todayMyCar))
                        .build()
        );

    }

}
