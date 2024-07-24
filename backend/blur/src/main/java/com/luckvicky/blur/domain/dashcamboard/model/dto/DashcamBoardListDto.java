package com.luckvicky.blur.domain.dashcamboard.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "블랙박스 게시물 목록 DTO")
public class DashcamBoardListDto{
    @Schema(description = "게시물 고유 식별값")
    private UUID id;

    @Schema(description = "게시물 제목")
    private String title;

    @Schema(description = "게시물 조회수")
    private Long viewCount;

    @Schema(description = "게시물 생성 시간")
    private LocalDateTime createdAt;

    @Schema(description = "블랙박스 영상 url")
    private List<String> videoUrl;

    // :todo 좋아요 수

    // :todo 채널 멘션 목록



}
