package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;

public record MemberProfileUpdate(
        @Schema(description = "이미지 url")
        String profileUrl,
        @Schema(description = "닉네임")
        String nickname,
        @Schema(description = "이미지 변경 여부")
        boolean imgChange,
        @Schema(description = "패스워드")
        String password,
        @Schema(description = "패스워드 체크")
        String passwordCheck
) {
}
