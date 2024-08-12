package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.InvalidEmailVerificationException;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.strategy.AuthCodeStrategy;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.infra.mail.model.AuthEmailFormData;
import com.luckvicky.blur.infra.mail.model.EmailForm;
import com.luckvicky.blur.infra.mail.model.EmailFormType;
import com.luckvicky.blur.infra.mail.service.EmailFormDataFactory;
import com.luckvicky.blur.infra.mail.service.EmailFormFactory;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthCodeService {
    private final Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap;
    private final Map<EmailFormType, EmailFormFactory> emailFormFactoryMap;

    public AuthCodeService(Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap,
                           Map<EmailFormType, EmailFormFactory> emailFormFactoryMap) {
        this.authCodeStrategyMap = authCodeStrategyMap;
        this.emailFormFactoryMap = emailFormFactoryMap;

    }

    public String createAuthCode(String email, AuthCodeType authCodeType) {
        AuthCodeStrategy strategy =  authCodeStrategyMap.get(authCodeType);
        return strategy.saveAuthCode(email);
    }

    public EmailForm getAuthEmailForm(String email, String code, AuthCodeType authCodeType) {
        AuthEmailFormData emailFormData = (AuthEmailFormData) EmailFormDataFactory.getEmailFormData(
                authCodeType.getEmailFormType());
        emailFormData.setAuthCodeType(authCodeType);
        emailFormData.setCode(code);

        return emailFormFactoryMap.get(authCodeType.getEmailFormType()).createEmailForm(email, true, emailFormData);
    }

    public Boolean checkValidCode(EmailAuth emailAuth, AuthCodeType authCodeType) {
        AuthCodeStrategy strategy = authCodeStrategyMap.get(authCodeType);

        boolean isValid = strategy.validAuthCode(emailAuth.email(), emailAuth.authCode());

        if (!isValid) throw new InvalidEmailVerificationException();

        strategy.pushAvailableEmail(emailAuth.email());
        return true;
    }

    public void checkAvailable(String email, AuthCodeType authCodeType) {
        AuthCodeStrategy strategy = authCodeStrategyMap.get(authCodeType);
        strategy.checkAvailableEmail(email);
    }
}
