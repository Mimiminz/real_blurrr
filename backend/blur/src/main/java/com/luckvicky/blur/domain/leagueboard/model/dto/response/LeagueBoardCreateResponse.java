package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "게시물 생성 응답")
public record LeagueBoardCreateResponse(

        @Schema(description = "생성한 게시물 고유 식별값")
        UUID id

        ) {

    public static LeagueBoardCreateResponse of(UUID id) {
        return LeagueBoardCreateResponse.builder()
                .id(id)
                .build();
    }

}
