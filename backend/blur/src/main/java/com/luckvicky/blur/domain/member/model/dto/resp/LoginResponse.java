package com.luckvicky.blur.domain.member.model.dto.resp;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "로그인 응답")
@JsonInclude(JsonInclude.Include.NON_NULL)
public record LoginResponse(

        @Schema(description = "엑세스 토큰")
        String accessToken,

        @Schema(description = "리프레시 토큰")
        String refreshToken,

        @Schema(description = "자동차 인증 여부")
        boolean isAuth

) {

}
