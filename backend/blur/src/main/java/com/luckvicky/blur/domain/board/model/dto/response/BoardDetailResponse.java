package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "게시글 상세 조회 응답")
public record BoardDetailResponse(
        @Schema(description = "게시글 상세 정보")
        BoardDetailDto boardDetail
) {

    public static BoardDetailResponse of(BoardDetailDto boardDetail) {
        return BoardDetailResponse.builder()
                .boardDetail(boardDetail)
                .build();
    }

}
