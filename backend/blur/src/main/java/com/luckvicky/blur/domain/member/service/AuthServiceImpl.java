package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.global.util.ResourceUtil;
import com.luckvicky.blur.infra.mail.service.MailService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private final AuthCodeFacade authCodeFacade;
    private final ResourceUtil resourceUtil;
    private final MailService mailService;


    public AuthServiceImpl(AuthCodeFacade authCodeFacade, ResourceUtil resourceUtil, MailService mailService) {
        this.authCodeFacade = authCodeFacade;
        this.resourceUtil = resourceUtil;
        this.mailService = mailService;
    }

    @Override
    public JwtDto login(SignInDto signInDto) {
        return null;
    }

    @Override
    public JwtDto reissueToken(ReissueDto reissue) {
        return null;
    }

    @Override
    public boolean createEmailAuthCode(String email, AuthCodeType authCodeType) {
        String code = authCodeFacade.createAuthCode(email, authCodeType);
        return true;
    }

    @Override
    public boolean validAuthCode(String email, AuthCodeType authCodeType) {
        return false;
    }

    private void sendAuthCodeEmail(String email, String authCode) {
        String htmlContent = resourceUtil.getHtml("classpath:templates/auth_email.html");

        htmlContent = htmlContent.replace("{{authCode}}", authCode);
        mailService.sendEmail(email, "이메일 인증 안내 | blurr", htmlContent, true);
    }

}
