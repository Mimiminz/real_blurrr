package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.jwt.model.JwtDto;

public interface MemberService {
    void createMember(SignupDto signupDto);
    JwtDto login(SignInDto signInDto);
    MemberProfile findMember(ContextMember contextMember);
}
