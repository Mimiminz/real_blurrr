package com.luckvicky.blur.infra.jwt.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "JWT 발급 시 결과값")
@JsonInclude(JsonInclude.Include.NON_NULL)
public record JwtDto(
        @Schema(description = "엑세스 토큰")
        String accessToken,
        @Schema(description = "리프레시 토큰")
        String refreshToken
) {
}
