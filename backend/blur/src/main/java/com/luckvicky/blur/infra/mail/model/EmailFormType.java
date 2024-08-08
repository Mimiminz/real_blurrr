package com.luckvicky.blur.infra.mail.model;

import lombok.Getter;

@Getter
public enum EmailFormType {
    SIGNIN_AUTH("회원가입 인증"),
    PASSWORD_CHANGE_AUTH("패스워드 찾기 인증");

    private final String purpose;

    EmailFormType(String purpose) {
        this.purpose = purpose;
    }
}
