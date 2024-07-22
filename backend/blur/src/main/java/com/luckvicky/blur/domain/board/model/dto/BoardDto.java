package com.luckvicky.blur.domain.board.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "게시물 Dto")
public class BoardDto {

    @Schema(description = "게시물 고유 식별값")
    String id;

    @Schema(description = "게시물 제목")
    String title;

    @Schema(description = "게시물 생성 시간")
    String createdAt;

}
