package com.luckvicky.blur.domain.member.model.dto.resp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "사용자 정보 업데이트 응답",
        description = "이미지 새로 변경 시 profileUrl에 s3 업로드 url 아닐 경우 기존 profile 이미지 주소")
public record MemberProfileUpdateResp(
        @Schema(description = "이미지 url")
        String profileUrl,
        @Schema(description = "닉네임")
        String nickname
) {

}
