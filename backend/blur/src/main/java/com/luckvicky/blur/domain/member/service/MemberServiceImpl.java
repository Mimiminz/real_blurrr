package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.*;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.domain.member.strategy.SingInAuthStrategy;
import com.luckvicky.blur.domain.member.strategy.PasswordAuthStrategy;
import com.luckvicky.blur.domain.member.model.dto.req.ChangeFindPassword;
import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.CheckPassword;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfileUpdateResp;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.global.jwt.service.JwtProvider;
import com.luckvicky.blur.global.util.ResourceUtil;
import com.luckvicky.blur.infra.aws.service.S3ImageService;
import com.luckvicky.blur.infra.mail.service.MailService;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import com.luckvicky.blur.infra.redis.service.RedisRefreshTokenAdapter;
import java.net.MalformedURLException;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisRefreshTokenAdapter redisRefreshTokenAdapter;
    private final S3ImageService s3ImageService;
    private final AuthCodeService authCodeService;
    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder,
                             JwtProvider jwtProvider, RedisRefreshTokenAdapter redisRefreshTokenAdapter,
                             S3ImageService s3ImageService, AuthCodeService authCodeService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.s3ImageService = s3ImageService;
        this.redisRefreshTokenAdapter = redisRefreshTokenAdapter;
        this.authCodeService = authCodeService;
    }

    @Transactional
    @Override
    public void createMember(SignupDto signupDto) {
        authCodeService.checkAvailable(signupDto.email(), AuthCodeType.SIGNIN);

        signupDto.valid();

        if (memberRepository.existsByNickname(signupDto.nickname())) throw new DuplicateNickName();

        Member member = Member.builder()
                .nickname(signupDto.nickname())
                .email(signupDto.email())
                .password(passwordEncoder.encode(signupDto.password()))
                .profileUrl("https://blurrr-img-bucket.s3.ap-northeast-2.amazonaws.com/images/user_default.png")
                .role(Role.ROLE_BASIC_USER)
                .build();

        memberRepository.save(member);
    }

    @Override
    public JwtDto login(SignInDto signInDto) {
        Member member = memberRepository.findByEmail(signInDto.email())
                .orElseThrow(NotExistMemberException::new);

        matchPassword(signInDto.password(), member.getPassword());

        String accessToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail());

        redisRefreshTokenAdapter.saveOrUpdate(member.getId().toString(), refreshToken);

        return new JwtDto(accessToken, refreshToken);
    }

    @Override
    public MemberProfile findMember(UUID memberId) {
        return MemberProfile.of(memberRepository.getOrThrow(memberId));
    }


    @Transactional
    @Override
    public MemberProfileUpdateResp modifyMember(UUID memberId, MemberProfileUpdate updateInfo) throws MalformedURLException {
        Member member = memberRepository.getOrThrow(memberId);
        member.updateNickname(updateInfo.nickname());

        //이미지 변경 시
        Map<String, String> imgUrl;
        String profileUrl = member.getProfileUrl();

        if (updateInfo.imgChange()) {
            imgUrl = s3ImageService.getPresignedUrl("images", updateInfo.fileName());
            profileUrl = imgUrl.get("fullUrl");
            member.updateImg(imgUrl.get("noQueryParamUrl"));
        }

        return new MemberProfileUpdateResp(profileUrl, member.getNickname());
    }

    @Transactional
    @Override
    public boolean modifyPassword(ChangePassword changePassword, UUID memberId) {
        Member member = memberRepository.getOrThrow(memberId);

        matchPassword(changePassword.oldPassword(), member.getPassword());

        member.updatePassword(passwordEncoder.encode(changePassword.newPassword()));
        return true;
    }

    @Transactional
    @Override
    public boolean modifyPassword(ChangeFindPassword changeFindPassword) {
        authCodeService.checkAvailable(changeFindPassword.email(), AuthCodeType.PASSWORD_CHANGE);

        if (!changeFindPassword.password().equals(changeFindPassword.passwordCheck())) {
            throw new PasswordMismatchException();
        }

        Member member = memberRepository.findByEmail(changeFindPassword.email()).orElseThrow(NotExistMemberException::new);
        member.updatePassword(passwordEncoder.encode(changeFindPassword.password()));
        return true;
    }

    @Override
    public boolean checkPassword(UUID memberId, CheckPassword checkPassword) {
        Member member = memberRepository.getOrThrow(memberId);
        return passwordEncoder.matches(checkPassword.password(), member.getPassword());
    }

    @Override
    public void logout(UUID memberId) {
        Member member = memberRepository.getOrThrow(memberId);
        redisRefreshTokenAdapter.delete(member.getId().toString());
    }


    private void matchPassword(String plain, String enc) {
        if (!passwordEncoder.matches(plain, enc)) {
            throw new PasswordMismatchException();
        }
    }
}
