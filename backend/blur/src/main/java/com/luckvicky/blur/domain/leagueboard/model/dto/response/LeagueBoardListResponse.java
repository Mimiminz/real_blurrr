package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "리그 게시물 목록 응답")
public record LeagueBoardListResponse(

        @Schema(description = "게시물 목록")
        List<BoardDto> boards

) {

    public static LeagueBoardListResponse of(List<BoardDto> boards) {
        return LeagueBoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
