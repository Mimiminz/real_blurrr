package com.luckvicky.blur.domain.dashcamboard.model.dto.response;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(name = "블랙박스 게시글 상세 응답")
public class DashcamBoardResponse {
    @Schema(description = "블랙박스 게시글 상세 정보")
    private DashcamBoardDto board;

    public static DashcamBoardResponse of(DashcamBoardDto board) {
        return DashcamBoardResponse.builder()
                .board(board)
                .build();
    }
}
