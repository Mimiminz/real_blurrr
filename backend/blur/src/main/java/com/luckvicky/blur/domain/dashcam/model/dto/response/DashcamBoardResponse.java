package com.luckvicky.blur.domain.dashcam.model.dto.response;

import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(name = "블랙박스 게시글 상세 응답")
public class DashcamBoardResponse {
    @Schema(description = "블랙박스 게시글 상세 정보")
    private DashcamBoardDetailDto board;

    public static DashcamBoardResponse of(DashcamBoardDetailDto board) {
        return DashcamBoardResponse.builder()
                .board(board)
                .build();
    }
}
