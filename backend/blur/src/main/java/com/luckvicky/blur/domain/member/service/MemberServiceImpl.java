package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void createMember(SignupDto signupDto) {
        Member member = Member.builder()
                .nickname(signupDto.nickname())
                .email(signupDto.email())
                .password(passwordEncoder.encode(signupDto.password()))
                .profileUrl("img url")
                .build();

        memberRepository.save(member);
    }
}
