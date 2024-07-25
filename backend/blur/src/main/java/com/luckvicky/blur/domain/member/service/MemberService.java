package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;

public interface MemberService {
    void createMember(SignupDto signupDto);
    JwtDto login(SignInDto signInDto);
    MemberProfile findMember(ContextMember contextMember);
    JwtDto reissueToken(ReissueDto reissue);
    Boolean checkNickname(String nickname);
}
