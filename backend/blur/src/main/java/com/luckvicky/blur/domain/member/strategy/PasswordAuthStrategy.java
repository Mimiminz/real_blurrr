package com.luckvicky.blur.domain.member.strategy;

import com.luckvicky.blur.domain.member.exception.InvalidEmailVerificationException;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.stereotype.Component;

@Component
public class PasswordAuthStrategy implements AuthCodeStrategy {
    private final RedisAuthCodeAdapter redisAuthCodeAdapter;
    private final MemberRepository memberRepository;

    public PasswordAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter, MemberRepository memberRepository) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
        this.memberRepository = memberRepository;
    }

    public void save(String email, String code) {
        if (!memberRepository.existsByEmail(email)) {
            throw new NotExistMemberException();
        }
        redisAuthCodeAdapter.saveOrUpdate(generateSaveKey(email), code, 10);
    }

    @Override
    public void pushAvailableEmail(String email) {
        redisAuthCodeAdapter.saveOrUpdate(generateAvailableKey(email), String.valueOf(true), 5);
    }

    @Override
    public void checkAvailable(String email) {
        redisAuthCodeAdapter.getValue(generateAvailableKey(email))
                .orElseThrow(InvalidEmailVerificationException::new);
    }

    private String generateSaveKey(String email) {
        return StringFormat.PASSWORD_AUTH_PREFIX + email;
    }

    private String generateAvailableKey(String email) {
        return StringFormat.PASSWORD_CHANGE_AVAILABLE_PREFIX + email;
    }
}
