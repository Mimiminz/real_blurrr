package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "사용자 정보 업데이트 요청")
public record MemberProfileUpdate(
        @Schema(description = "이미지 파일명")
        String fileName,
        @Schema(description = "닉네임", nullable = false)
        @NotBlank
        String nickname,
        @Schema(description = "이미지 변경 여부", nullable = false)
        boolean imgChange,
        @Schema(description = "패스워드 변경 시 변경값", nullable = true)
        String password,
        @Schema(description = "패스워드 체크", nullable = true)
        String passwordCheck
) {
}
