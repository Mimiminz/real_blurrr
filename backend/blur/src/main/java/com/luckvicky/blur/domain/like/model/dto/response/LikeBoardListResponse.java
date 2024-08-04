package com.luckvicky.blur.domain.like.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "좋아요 게시글 목록")
public record LikeBoardListResponse(

        @Schema(description = "게시글 목록")
        List<BoardDto> boards

) {


    public static LikeBoardListResponse of(List<BoardDto> boards) {
        return LikeBoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
