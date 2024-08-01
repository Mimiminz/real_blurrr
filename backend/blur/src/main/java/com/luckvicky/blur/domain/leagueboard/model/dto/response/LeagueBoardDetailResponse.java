package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "게시글 상세 조회 응답")
public record LeagueBoardDetailResponse(
        
        @Schema(description = "게시물 정보")
        BoardDetailDto boardDetail
        
){

    public static LeagueBoardDetailResponse of(BoardDetailDto boardDetail) {
        return LeagueBoardDetailResponse.builder()
                .boardDetail(boardDetail)
                .build();
    }

}
