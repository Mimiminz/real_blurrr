package com.luckvicky.blur.domain.member.model.dto.resp;

import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "사용자 프로필 정보")
public record MemberProfile(
        @Schema(description = "이메일")
        String email,
        @Schema(description = "이미지 url")
        String profileUrl,
        @Schema(description = "닉네임")
        String nickname,
        @Schema(description = "차량 인증 여부")
        boolean isAuth
        ) {
    public static MemberProfile of(Member member) {
        return new MemberProfile(member.getEmail(), member.getProfileUrl(), member.getNickname(), member.isAuth());
    }
}
