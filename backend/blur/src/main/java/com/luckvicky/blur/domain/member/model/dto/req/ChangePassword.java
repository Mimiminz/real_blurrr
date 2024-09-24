package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Schema(name = "마이페이지 비밀번호 변경")
public record ChangePassword(
        @NotBlank
        @Schema(description = "현재 비밀번호")
        String oldPassword,
        
        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        @Schema(description = "새 비밀번호")
        String newPassword,

        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        @Schema(description = "새 비밀번호 확인")
        String newPasswordCheck
) {
}
