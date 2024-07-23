package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(description = "게시물 유형별 조회 응답")
public record BoardListDto(
        @Schema(description = "게시물 목록")
        List<BoardDto> boards
) {

    public static BoardListDto of(List<BoardDto> boards) {
        return BoardListDto.builder()
                .boards(boards)
                .build();
    }

}
