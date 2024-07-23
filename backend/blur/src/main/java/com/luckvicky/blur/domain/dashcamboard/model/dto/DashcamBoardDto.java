package com.luckvicky.blur.domain.dashcamboard.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@Schema(name = "블랙박스 게시글 DTO")
public class DashcamBoardDto {
    @Schema(description = "게시물 고유 식별값")
    private UUID id;

}
