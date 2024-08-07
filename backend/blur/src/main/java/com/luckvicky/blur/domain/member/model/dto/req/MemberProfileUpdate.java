package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
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
        boolean imgChange
) {
}
