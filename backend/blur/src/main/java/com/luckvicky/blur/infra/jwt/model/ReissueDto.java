package com.luckvicky.blur.infra.jwt.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "엑세스 토큰 재발급")
public record ReissueDto(
        @Schema(description = "리프레시 토큰")
        @NotBlank(message = "리프레시 토큰을 요청해주세요")
        String refreshToken
) {
}
