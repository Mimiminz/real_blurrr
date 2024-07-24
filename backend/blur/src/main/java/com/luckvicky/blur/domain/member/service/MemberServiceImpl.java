package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.DuplicateEmailException;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.exception.PasswordMismatchException;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.execption.BaseException;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.global.jwt.service.JwtProvider;
import com.luckvicky.blur.infra.redis.service.RedisRefreshTokenService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisRefreshTokenService redisRefreshTokenService;

    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder,
                             JwtProvider jwtProvider, RedisRefreshTokenService redisRefreshTokenService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.redisRefreshTokenService = redisRefreshTokenService;
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
                .orElseThrow(NotExistMemberException::new);

        if (!passwordEncoder.matches(signInDto.password(), member.getPassword())) {
            throw new PasswordMismatchException();
        }

        String accessToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail());

        redisRefreshTokenService.saveOrUpdateRefreshToken(member.getId().toString(), refreshToken);

        return new JwtDto(accessToken, refreshToken);
    }

    @Override
    public MemberProfile findMember(ContextMember contextMember) {
        Member member = memberRepository.getOrThrow(contextMember.getId());

        return MemberProfile.of(member);
    }

    @Override
    public JwtDto reissueToken(ReissueDto reissue) {
        //유효성 검증
        if (!jwtProvider.validation(reissue.refreshToken())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        //유저 조회
        Member member = memberRepository.findByEmail(jwtProvider.getEmail(reissue.refreshToken()))
                .orElseThrow(NotExistMemberException::new);

        String accessToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail());

        redisRefreshTokenService.saveOrUpdateRefreshToken(member.getId().toString(), refreshToken);
        return new JwtDto(accessToken, refreshToken);
    }
}
