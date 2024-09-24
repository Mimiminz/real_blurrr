package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "마이페이지 진입 비밀번호 확인")
public record CheckPassword(
        @NotBlank
        @Schema(description = "비밀번호")
        String password
) {
}
