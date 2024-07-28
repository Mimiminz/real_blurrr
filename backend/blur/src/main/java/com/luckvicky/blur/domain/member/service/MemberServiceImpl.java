package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.DuplicateEmailException;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.exception.PasswordMismatchException;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
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
import com.luckvicky.blur.infra.aws.service.S3ImageService;
import com.luckvicky.blur.infra.redis.service.RedisRefreshTokenService;
import io.jsonwebtoken.ExpiredJwtException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisRefreshTokenService redisRefreshTokenService;
    private final S3ImageService s3ImageService;

    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder,
                             JwtProvider jwtProvider, RedisRefreshTokenService redisRefreshTokenService,
                             S3ImageService s3ImageService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.redisRefreshTokenService = redisRefreshTokenService;
        this.s3ImageService = s3ImageService;
    }

    @Transactional
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
    public MemberProfile findMember(UUID memberId) {
        return MemberProfile.of(memberRepository.getOrThrow(memberId));
    }

    @Transactional
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

    @Override
    public Boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    @Override
    public MemberProfile modifyMember(UUID memberId, MemberProfileUpdate updateInfo) throws MalformedURLException {
        Member member = memberRepository.getOrThrow(memberId);
        member.updateNickname(updateInfo.nickname());

        //패드워드 변경 시
        if (StringUtils.hasText(updateInfo.password())) {
            member.updatePassword(passwordEncoder.encode(updateInfo.password()));
        }

        //이미지 변경 시
        Map<String, String> imgUrl = new HashMap<>();
        if (updateInfo.imgChange()) {
            imgUrl = s3ImageService.getPresignedUrl("images", updateInfo.fileName());
            member.updateImg(imgUrl.get("fullUrl"));
        }

        MemberProfile reuslt = MemberProfile.of(member);
        if (updateInfo.imgChange()) {
            member.updateImg(imgUrl.get("noQueryParamUrl"));
        }

        return reuslt;
    }
}
