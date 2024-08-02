package com.luckvicky.blur.domain.member.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(name = "사용자 정보")
public class MemberDto {
    @Schema(description = "이메일")
    private String email;

    @Schema(description = "이미지 url")
    private String profileUrl;

    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "모델")
    private String carModel;

    @Schema(description = "표시명")
    private String carTitle;

    @Schema(description = "제조사")
    private String carManufacture;

    public static MemberDto of(Member member){
        return MemberDto.builder()
                .email(member.getEmail())
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .carModel(member.getCarModel())
                .carTitle(member.getCarTitle())
                .carManufacture(member.getCarManufacture())
                .build();
    }

}
