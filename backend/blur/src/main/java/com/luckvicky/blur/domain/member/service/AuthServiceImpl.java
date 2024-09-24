package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.infra.jwt.model.JwtDto;
import com.luckvicky.blur.infra.jwt.model.ReissueDto;
import com.luckvicky.blur.infra.jwt.service.JwtProvider;
import com.luckvicky.blur.infra.mail.model.EmailForm;
import com.luckvicky.blur.infra.mail.service.MailService;
import com.luckvicky.blur.infra.redis.service.RedisRefreshTokenAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthCodeService authCodeService;
    private final MailService mailService;
    private final MemberRepository memberRepository;
    private final RedisRefreshTokenAdapter redisRefreshTokenAdapter;
    private final JwtProvider jwtProvider;


    public AuthServiceImpl(AuthCodeService authCodeService, MailService mailService, MemberRepository memberRepository, RedisRefreshTokenAdapter redisRefreshTokenAdapter, JwtProvider jwtProvider) {
        this.authCodeService = authCodeService;
        this.mailService = mailService;
        this.memberRepository = memberRepository;
        this.redisRefreshTokenAdapter = redisRefreshTokenAdapter;
        this.jwtProvider = jwtProvider;
    }


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
    public boolean createEmailAuthCode(String email, AuthCodeType authCodeType) {
        String code = authCodeService.createAuthCode(email, authCodeType);

        EmailForm emailForm = authCodeService.getAuthEmailForm(email, code, authCodeType);

        mailService.sendEmail(emailForm.getTo(), emailForm.getSubject(), emailForm.getContent(), emailForm.isHtml());
        return true;
    }

    @Override
    public boolean validAuthCode(EmailAuth emailAuth, AuthCodeType authCodeType) {
        return authCodeService.checkValidCode(emailAuth, authCodeType);
    }

    @Override
    public Boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }
}
