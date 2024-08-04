package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "리그 게시글 좋아요 정보 응답")
public record LeagueBoardLikeResponse(

        @Schema(description = "좋아요 개수")
        Long likeCount,

        @Schema(description = "좋아요 여부")
        Boolean isLike

) {

        public static LeagueBoardLikeResponse of(Long likeCount, Boolean isLike) {
                return LeagueBoardLikeResponse.builder()
                        .likeCount(likeCount)
                        .isLike(isLike)
                        .build();
        }

}
