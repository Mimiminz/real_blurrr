package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "인기 차자랑 게시물 조회 응답")
public record HotMyCarResponse(
        @Schema(description = "게시물 목록")
        List<MyCarDto> boards
) {

    public static HotMyCarResponse of(List<MyCarDto> boards) {
        return HotMyCarResponse.builder()
                .boards(boards)
                .build();
    }

}
