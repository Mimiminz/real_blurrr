package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import java.net.MalformedURLException;
import java.util.UUID;

public class MemberFacade implements MemberService{

    @Override
    public void createMember(SignupDto signupDto) {

    }

    @Override
    public JwtDto login(SignInDto signInDto) {
        return null;
    }

    @Override
    public MemberProfile findMember(UUID memberId) {
        return null;
    }

    @Override
    public JwtDto reissueToken(ReissueDto reissue) {
        return null;
    }

    @Override
    public Boolean checkNickname(String nickname) {
        return null;
    }

    @Override
    public MemberProfile modifyMember(UUID memberId, MemberProfileUpdate updateInfo) throws MalformedURLException {
        return null;
    }

    @Override
    public boolean authEmail(String email) {
        return false;
    }

    @Override
    public boolean validEmailAuth(EmailAuth emailAuth) {
        return false;
    }
}
