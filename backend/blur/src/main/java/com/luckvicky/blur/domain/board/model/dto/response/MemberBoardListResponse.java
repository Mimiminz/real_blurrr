package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "사용자 작성 게시글")
public record MemberBoardListResponse(
        @Schema(description = "작성 게시글 목록")
        List<BoardDto> boards
) {

    public static MemberBoardListResponse of(List<BoardDto> boards) {
        return MemberBoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
