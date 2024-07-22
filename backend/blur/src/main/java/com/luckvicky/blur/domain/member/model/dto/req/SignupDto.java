package com.luckvicky.blur.domain.member.model.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "회원가입")
public record SignupDto (
        @JsonProperty("email") String email,
        @JsonProperty("nickname") String nickname,
        @JsonProperty("password") String password,
        @JsonProperty("passwordCheck") String passwordCheck
){
}
