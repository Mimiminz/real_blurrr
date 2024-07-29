package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "핫 게시물 조회 응답")
public record HotBoardResponse(
        @Schema(description = "게시물 목록")
        List<HotBoardDto> boards
) {

    public static HotBoardResponse of(List<HotBoardDto> boards) {
        return HotBoardResponse.builder()
                .boards(boards)
                .build();
    }

}
