package com.luckvicky.blur.domain.member.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "사용자 정보")
public class MemberDto {

    @Schema(description = "닉네임")
    private String nickname;

    @Schema(description = "모델")
    private String carModel;

}
