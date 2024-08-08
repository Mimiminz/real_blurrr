package com.luckvicky.blur.domain.member.strategy;

import lombok.Getter;

@Getter
public enum AuthCodeType {
    SIGNIN("회원가입"),
    PASSWORD_CHANGE("비밀번호찾기");
    private final String type;

    AuthCodeType(String type) {
        this.type = type;
    }

    public static AuthCodeType of(String t) {
        return AuthCodeType.valueOf(t.toUpperCase());
    }
}
