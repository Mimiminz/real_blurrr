package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.DuplicateEmailException;
import com.luckvicky.blur.domain.member.exception.PasswordMismatchException;
import com.luckvicky.blur.domain.member.exception.UserNotFoundException;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.service.JwtProvider;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder,
                             JwtProvider jwtProvider) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void createMember(SignupDto signupDto) {
        signupDto.valid();

        if (memberRepository.existsByEmail(signupDto.email())) {
            throw new DuplicateEmailException();
        }

        Member member = Member.builder()
                .nickname(signupDto.nickname())
                .email(signupDto.email())
                .password(passwordEncoder.encode(signupDto.password()))
                .profileUrl("img url")
                .role(Role.ROLE_BASIC_USER)
                .build();

        memberRepository.save(member);
    }

    @Override
    public JwtDto login(SignInDto signInDto) {
        Member member = memberRepository.findByEmail(signInDto.email())
                .orElseThrow(UserNotFoundException::new);

        if (!passwordEncoder.matches(signInDto.password(), member.getPassword())) {
            throw new PasswordMismatchException();
        }

        String accessToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());
        String refreshToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());

        return new JwtDto(accessToken, refreshToken);
    }
}
