package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "로그인")
public record SignInDto(

        @Schema(description = "이메일(id)", example = "teamluckyvickyblurrr@gmail.com")
        @NotBlank
        String email,

        @Schema(description = "비밀번호", example = "blurrr11!!")
        @NotBlank
        String password

) {

}
