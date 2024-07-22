package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "로그인, 회원가입 API")
@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity createMember(@RequestBody SignupDto signupDto) {
        memberService.createMember(signupDto);
        return null;
    }
}
