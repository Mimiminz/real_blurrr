package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import java.net.MalformedURLException;
import java.util.UUID;

public interface MemberService {
    void createMember(SignupDto signupDto);
    JwtDto login(SignInDto signInDto);
    MemberProfile findMember(UUID memberId);
    JwtDto reissueToken(ReissueDto reissue);
    Boolean checkNickname(String nickname);
    MemberProfile modifyMember(UUID memberId, MemberProfileUpdate updateInfo) throws MalformedURLException;
}
