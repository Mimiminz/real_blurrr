package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "이메일 인증 코드 확인")
public record EmailAuth(
        @Schema(description = "이메일")
        @NotBlank
        String email,
        @Schema(description = "인증 코드값")
        @NotBlank
        String authCode
) {
}
