package com.luckvicky.blur.domain.member.model;

import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "사용자 간단 정보")
public class SimpleMemberDto {
    @Schema(description = "사용자 프로필")
    private String profileUrl;

    @Schema(description = "사용자 닉네임")
    private String nickname;

    @Schema(description = "표시명")
    private String carTitle;

    public static SimpleMemberDto of(Member member){
        return SimpleMemberDto.builder()
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .carTitle(member.getCarTitle())
                .build();
    }

}
