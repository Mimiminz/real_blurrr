package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.DuplicateEmailException;
import com.luckvicky.blur.domain.member.exception.ExpiredEmailAuthException;
import com.luckvicky.blur.domain.member.exception.InvalidEmailVerificationException;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.exception.PasswordMismatchException;
import com.luckvicky.blur.domain.member.factory.EmailAuthStrategy;
import com.luckvicky.blur.domain.member.factory.PasswordAuthStrategy;
import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.CheckPassword;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
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
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisRefreshTokenAdapter redisRefreshTokenAdapter;
    private final S3ImageService s3ImageService;

    private final MailService mailService;

    private final ResourceUtil resourceUtil;
    private final PasswordAuthStrategy passwordAuthStrategy;
    private final EmailAuthStrategy emailAuthStrategy;
    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    public MemberServiceImpl(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder,
                             JwtProvider jwtProvider, RedisRefreshTokenAdapter redisRefreshTokenAdapter,
                             S3ImageService s3ImageService, MailService mailService, ResourceUtil resourceUtil,
                             PasswordAuthStrategy passwordAuthStrategy,
                             EmailAuthStrategy emailAuthStrategy,
                             RedisAuthCodeAdapter redisAuthCodeAdapter) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.s3ImageService = s3ImageService;
        this.mailService = mailService;
        this.resourceUtil = resourceUtil;
        this.passwordAuthStrategy = passwordAuthStrategy;
        this.emailAuthStrategy = emailAuthStrategy;
        this.redisRefreshTokenAdapter = redisRefreshTokenAdapter;
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
    }

    @Transactional
    @Override
    public void createMember(SignupDto signupDto) {

        redisAuthCodeAdapter.getValue(emailAuthStrategy.generateAvailableKey(signupDto.email()))
                .orElseThrow(InvalidEmailVerificationException::new);

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

        redisRefreshTokenAdapter.saveOrUpdate(member.getId().toString(), refreshToken);

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

        String email = jwtProvider.getEmail(reissue.refreshToken());

        // 유저 조회
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(NotExistMemberException::new);

        // Redis에서 Refresh Token 검증
        String storedRefreshToken = redisRefreshTokenAdapter.getValue(member.getId().toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        if (!storedRefreshToken.equals(reissue.refreshToken())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        String accessToken = jwtProvider.createAccessToken(member.getEmail(), member.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail());

        redisRefreshTokenAdapter.saveOrUpdate(member.getId().toString(), refreshToken);
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

    @Override
    public boolean modifyPassword(ChangePassword changePassword) {
        redisAuthCodeAdapter.getValue(passwordAuthStrategy.generateAvailableKey(changePassword.email()))
                .orElseThrow(InvalidEmailVerificationException::new);

        if (!changePassword.password().equals(changePassword.passwordCheck())) {
            throw new PasswordMismatchException();
        }

        Member member = memberRepository.findByEmail(changePassword.email()).orElseThrow(NotExistMemberException::new);
        member.updatePassword(passwordEncoder.encode(changePassword.password()));
        return true;
    }

    @Transactional
    @Override
    public boolean createEmailAuthCode(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicateEmailException();
        }

        String authCode = emailAuthStrategy.saveAuthCode(email);

        sendAuthCodeEmail(email, authCode);

        return true;
    }

    private void sendAuthCodeEmail(String email, String authCode) {
        String htmlContent = resourceUtil.getHtml("classpath:templates/auth_email.html");

        htmlContent = htmlContent.replace("{{authCode}}", authCode);
        mailService.sendEmail(email, "이메일 인증 안내 | blurr", htmlContent, true);
    }

    @Override
    public boolean validEmailAuth(EmailAuth emailAuth) {
        if (!checkAuthCode(emailAuthStrategy.generateKey(emailAuth.email()), emailAuth.authCode())) {
            return false;
        }
        emailAuthStrategy.pushAvailableEmail(emailAuth.email());
        return true;
    }

    @Override
    public boolean createPasswordAuthCode(String email) {
        if (!memberRepository.existsByEmail(email)) {
            throw new NotExistMemberException();
        }

        passwordAuthStrategy.saveAuthCode(email);
        return true;
    }

    @Override
    public boolean validPasswordAuthCode(EmailAuth emailAuth) {
        if (!checkAuthCode(passwordAuthStrategy.generateKey(emailAuth.email()), emailAuth.authCode())) {
            return false;
        }
        passwordAuthStrategy.pushAvailableEmail(emailAuth.email());
        return true;
    }

    @Override
    public boolean checkPassword(UUID memberId, CheckPassword checkPassword) {
        Member member = memberRepository.getOrThrow(memberId);
        return passwordEncoder.matches(member.getPassword(), checkPassword.password());
    }

    @Override
    public void logout(UUID memberId) {
        Member member = memberRepository.getOrThrow(memberId);
        redisRefreshTokenAdapter.delete(member.getId().toString());
    }

    private boolean checkAuthCode(String key, String code) {
        String getCode = redisAuthCodeAdapter.getValue(key).orElseThrow(ExpiredEmailAuthException::new);

        if (!getCode.equals(code)) {
            return false;
        }
        return true;
    }

}
