package com.luckvicky.blur.domain.member.strategy;

import com.luckvicky.blur.infra.mail.model.EmailFormType;
import lombok.Getter;

@Getter
public enum AuthCodeType {
    SIGNUP("회원가입", EmailFormType.SIGNUP_AUTH),
    PASSWORD_CHANGE("비밀번호찾기", EmailFormType.PASSWORD_CHANGE_AUTH);
    private final String type;
    private final EmailFormType emailFormType;

    AuthCodeType(String type, EmailFormType emailFormType) {
        this.type = type;
        this.emailFormType = emailFormType;
    }

    public static AuthCodeType of(String t) {
        return AuthCodeType.valueOf(t.toUpperCase());
    }
}
