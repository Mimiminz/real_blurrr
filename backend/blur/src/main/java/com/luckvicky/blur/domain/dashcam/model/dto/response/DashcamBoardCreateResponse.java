package com.luckvicky.blur.domain.dashcam.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "블랙박스 게시글 요청 응답")
public record DashcamBoardCreateResponse(

        @Schema(description = "게시글 고유 식별값")
        UUID id

) {

    public static DashcamBoardCreateResponse of(UUID id) {
        return DashcamBoardCreateResponse.builder()
                .id(id)
                .build();
    }

}
