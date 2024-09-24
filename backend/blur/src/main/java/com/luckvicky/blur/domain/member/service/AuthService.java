package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.infra.jwt.model.JwtDto;
import com.luckvicky.blur.infra.jwt.model.ReissueDto;

public interface AuthService {
    JwtDto reissueToken(ReissueDto reissue);
    boolean createEmailAuthCode(String email, AuthCodeType authCodeType);
    boolean validAuthCode(EmailAuth emailAuth, AuthCodeType authCodeType);
    Boolean checkNickname(String nickname);
}
