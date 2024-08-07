package com.luckvicky.blur.domain.channelboard.controller;

import com.luckvicky.blur.domain.channelboard.model.dto.response.HotDashCamListResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotMyCarListResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotBoardListResponse;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardRetrieveService;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "메인 페이지 API")
@RestController
@RequestMapping("/v1/channels")
@RequiredArgsConstructor
public class ChannelBoardRetrieveController {

    private final ChannelBoardRetrieveService channelBoardRetrieveService;

    @Operation(
            summary = "HOT 게시판 조회 API", description = "최근 1주일 동안 가장 좋아요를 많이 받은 10개의 게시글을 조회한다."
    )
    @GetMapping("/hot")
    public ResponseEntity<Result<PaginatedResponse<HotBoardListResponse>>> getHotBoard() {

        PaginatedResponse<HotBoardListResponse> response = channelBoardRetrieveService.getHotBoard();

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(
            summary = "HOT 블랙박스 게시판 조회 API", description = "최근 1주일 동안 가장 투표를 많이 받은 5개의 게시글을 조회한다."
    )
    @GetMapping("/dashcam")
    public ResponseEntity<Result<PaginatedResponse<HotDashCamListResponse>>> getHotDashcamBoard() {

        PaginatedResponse<HotDashCamListResponse> response = channelBoardRetrieveService.getHotDashcamBoard();

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(
            summary = "HOT 차자랑 게시판 조회 API", description = "최근 1주일 동안 가장 조회수가 높은 많이 받은 20개의 게시글을 조회한다."
    )
    @GetMapping("/mycar")
    public ResponseEntity<Result<PaginatedResponse<HotMyCarListResponse>>> getHotMyCarBoard() {

        PaginatedResponse<HotMyCarListResponse> response = channelBoardRetrieveService.getHotMyCarBoard();

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(
            summary = "오늘의차 조회 API", description = "어제 차자랑 게시글 중 가장 좋아요가 높았던 1개 게시글을 조회한다."
    )
    @GetMapping("/today/mycar")
    public ResponseEntity<Result<TodayMyCarResponse>> geTodayMyCarBoard() {

        TodayMyCarResponse todayMyCar = channelBoardRetrieveService.getTodayMyCarBoard();

        if (Objects.isNull(todayMyCar)) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(todayMyCar));

    }

}
