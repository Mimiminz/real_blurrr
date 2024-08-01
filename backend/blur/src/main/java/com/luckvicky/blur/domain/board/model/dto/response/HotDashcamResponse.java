package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "인기 블랙박스 게시물 조회 응답")
public record HotDashcamResponse(
        @Schema(description = "게시물 목록")
        List<HotDashcamDto> boards
) {

    public static HotDashcamResponse of(List<HotDashcamDto> boards) {
        return HotDashcamResponse.builder()
                .boards(boards)
                .build();
    }

}
