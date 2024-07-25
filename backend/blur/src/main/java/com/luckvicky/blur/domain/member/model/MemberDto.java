package com.luckvicky.blur.domain.member.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Schema(name = "사용자 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberDto {

    @Schema(description = "식별값")
    private UUID id;

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

}
