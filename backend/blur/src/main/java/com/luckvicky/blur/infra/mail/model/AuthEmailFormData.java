package com.luckvicky.blur.infra.mail.model;

import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthEmailFormData implements EmailFormData {
    private AuthCodeType authCodeType;
    private String code;

    public AuthEmailFormData() {
    }

    public AuthEmailFormData(AuthCodeType authCodeType, String code) {
        this.authCodeType = authCodeType;
        this.code = code;
    }
}
