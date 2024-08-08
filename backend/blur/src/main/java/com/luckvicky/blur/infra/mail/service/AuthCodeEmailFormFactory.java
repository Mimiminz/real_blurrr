package com.luckvicky.blur.infra.mail.service;

import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.global.util.ResourceUtil;
import com.luckvicky.blur.infra.mail.model.AuthEmailFormData;
import com.luckvicky.blur.infra.mail.model.EmailForm;
import com.luckvicky.blur.infra.mail.model.EmailFormData;

public class AuthCodeEmailFormFactory implements EmailFormFactory {
    private final ResourceUtil resourceUtil;

    public AuthCodeEmailFormFactory(ResourceUtil resourceUtil) {
        this.resourceUtil = resourceUtil;
    }

    @Override
    public EmailForm createEmailForm(String to, boolean isHtml, EmailFormData formData) {
        if (!(formData instanceof AuthEmailFormData)) {
            throw new IllegalArgumentException("Invalid data type");
        }

        var d = (AuthEmailFormData) formData;
        String body = getMailForm().replace("{{authCode}}", d.getCode()).replace("{{type}}", d.getAuthCodeType().getEmailFormType().getPurpose());
        String subject = getSubject(d.getAuthCodeType());
        return new EmailForm(to, subject, body, isHtml);
    }
    private String getSubject(AuthCodeType authCodeType) {
        return authCodeType.getEmailFormType().getPurpose() + " 이메일 입니다";
    }

    private String getMailForm() {
        return resourceUtil.getHtml("classpath:templates/auth_email.html");
    }
}
