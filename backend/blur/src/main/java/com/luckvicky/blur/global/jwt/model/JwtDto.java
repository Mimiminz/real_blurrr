package com.luckvicky.blur.global.jwt.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record JwtDto(
        String accessToken,
        String refreshToken
) {
}
