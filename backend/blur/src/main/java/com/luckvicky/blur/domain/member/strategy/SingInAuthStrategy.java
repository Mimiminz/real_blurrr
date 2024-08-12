package com.luckvicky.blur.domain.member.strategy;

import com.luckvicky.blur.domain.member.exception.DuplicateEmailException;
import com.luckvicky.blur.domain.member.exception.ExpiredEmailAuthException;
import com.luckvicky.blur.domain.member.exception.InvalidEmailVerificationException;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.stereotype.Component;

public class SingInAuthStrategy implements AuthCodeStrategy {

    private final RedisAuthCodeAdapter redisAuthCodeAdapter;
    private final MemberRepository memberRepository;

    public SingInAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter, MemberRepository memberRepository) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
        this.memberRepository = memberRepository;
    }

    @Override
    public void save(String email, String code) {
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicateEmailException();
        }

        redisAuthCodeAdapter.saveOrUpdate(generateSaveKey(email), code, 5);
    }

    @Override
    public boolean validAuthCode(String email, String code) {
        String getCode = redisAuthCodeAdapter.getValue(generateSaveKey(email)).orElseThrow(ExpiredEmailAuthException::new);
        return getCode.equals(code);
    }

    private String generateSaveKey(String email) {
        return StringFormat.EMAIL_AUTH_PREFIX + email;
    }

    @Override
    public void pushAvailableEmail(String email) {
        redisAuthCodeAdapter.saveOrUpdate(generateAvailableKey(email), String.valueOf(true), 1440);
    }

    @Override
    public void checkAvailableEmail(String email) {
        redisAuthCodeAdapter.getValue(generateAvailableKey(email))
                .orElseThrow(InvalidEmailVerificationException::new);
    }

    private String generateAvailableKey(String email) {
        return StringFormat.EMAIL_AVAILABLE_PREFIX + email;
    }
}
