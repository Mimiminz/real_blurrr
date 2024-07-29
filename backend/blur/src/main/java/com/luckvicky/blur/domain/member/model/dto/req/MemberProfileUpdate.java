package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

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
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        String password,
        @Schema(description = "패스워드 체크", nullable = true)
        String passwordCheck
) {
}
