package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;

public interface MemberService {
    void createMember(SignupDto signupDto);
}
