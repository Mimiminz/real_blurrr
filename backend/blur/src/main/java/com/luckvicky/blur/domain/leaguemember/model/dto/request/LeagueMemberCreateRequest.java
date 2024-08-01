package com.luckvicky.blur.domain.leaguemember.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;

@Schema(name = "리그 할당 요청")
public record LeagueMemberCreateRequest(
        @Schema(description = "할당할 리그 이름", example = "[\"현대\", \"GV70\"]"
        )
        List<String> leagues
) {
}
