package com.luckvicky.blur.domain.member.model.dto.resp;

import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;


public record MemberProfile(
        @Schema(description = "식별값")
        UUID id,
        @Schema(description = "이메일")
        String email,
        @Schema(description = "이미지 url")
        String profileUrl,
        @Schema(description = "닉네임")
        String nickname) {

        public static MemberProfile of(Member member) {
                return new MemberProfile(member.getId(), member.getEmail(), member.getProfileUrl(), member.getNickname());
        }
}
