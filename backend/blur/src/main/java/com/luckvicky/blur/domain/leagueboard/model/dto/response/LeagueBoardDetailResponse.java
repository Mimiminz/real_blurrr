package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "게시글 상세 조회 응답")
public record LeagueBoardDetailResponse(
        
        @Schema(description = "조회수")
        Long viewCont,

        @Schema(description = "본문")
        String content
){

    public static LeagueBoardDetailResponse of(Long viewCount, String content) {
        return LeagueBoardDetailResponse.builder()
                .viewCont(viewCount)
                .content(content)
                .build();
    }

}
