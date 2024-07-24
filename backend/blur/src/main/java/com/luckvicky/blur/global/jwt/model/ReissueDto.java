package com.luckvicky.blur.global.jwt.model;

import jakarta.validation.constraints.NotBlank;

public record ReissueDto(
        @NotBlank
        String refreshToken
) {
}
