package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import com.luckvicky.blur.domain.board.model.dto.HotMyCarDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "인기 차자랑 게시물 조회 응답")
public record HotMyCarResponse(
        @Schema(description = "게시물 목록")
        List<HotMyCarDto> boards
) {

    public static HotMyCarResponse of(List<HotMyCarDto> boards) {
        return HotMyCarResponse.builder()
                .boards(boards)
                .build();
    }

}
