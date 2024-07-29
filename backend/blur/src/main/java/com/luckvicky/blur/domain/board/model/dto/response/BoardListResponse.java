package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "게시물 유형별 조회 응답")
public record BoardListResponse(
        @Schema(description = "게시물 목록")
        List<BoardDto> boards
) {

    public static BoardListResponse of(List<BoardDto> boards) {
        return BoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
