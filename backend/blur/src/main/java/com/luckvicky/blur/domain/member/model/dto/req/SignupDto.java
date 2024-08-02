package com.luckvicky.blur.domain.member.model.dto.req;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.luckvicky.blur.domain.member.exception.PasswordMismatchException;
import com.luckvicky.blur.global.enums.code.ErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Schema(name = "회원가입")
public record SignupDto(

        @JsonProperty("email")
        @Email
        @Schema(description = "이메일", example = "teamluckyvickyblurrr@gmail.com")
        String email,

        @JsonProperty("nickname")
        @NotBlank
        @Schema(description = "닉네임", example = "blur")
        String nickname,

        @JsonProperty("password")
        @NotBlank
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        @Schema(description = "비밀번호", example = "blurrr11!!")
        String password,

        @JsonProperty("passwordCheck")
        @NotBlank
        @Schema(description = "비밀번호 확인", example = "blurrr11!!")
        String passwordCheck

) {
    public void valid() {
        if (!password.equals(passwordCheck)) {
            throw new PasswordMismatchException();
        }
    }
}
