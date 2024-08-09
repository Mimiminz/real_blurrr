package com.luckvicky.blur.domain.member.model.dto.req;

import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.global.annotation.custom.ValidEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "이메일 인증 코드 확인")
public record EmailAuth(
        @Schema(description = "이메일", example = "teamluckyvickyblurrr@gmail.com")
        @NotBlank
        String email,
        @Schema(description = "인증 코드값")
        @NotBlank
        String authCode,
        @Schema(description = "코드 타입")
        @ValidEnum(enumClass = AuthCodeType.class, ignoreCase = true)
        String type
) {
}
