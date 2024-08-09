package com.luckvicky.blur.domain.member.strategy;

import com.luckvicky.blur.domain.member.exception.InvalidEmailVerificationException;
import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.stereotype.Component;

@Component
public class SingInAuthStrategy implements AuthCodeStrategy {

    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    public SingInAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
    }

    @Override
    public void save(String email, String code) {
        redisAuthCodeAdapter.saveOrUpdate(generateSaveKey(email), code, 5);
    }

    private String generateSaveKey(String email) {
        return StringFormat.EMAIL_AUTH_PREFIX + email;
    }

    @Override
    public void pushAvailableEmail(String email) {
        redisAuthCodeAdapter.saveOrUpdate(generateAvailableKey(email), String.valueOf(true), 720);
    }

    @Override
    public void checkAvailable(String email) {
        redisAuthCodeAdapter.getValue(generateAvailableKey(email))
                .orElseThrow(InvalidEmailVerificationException::new);
    }

    private String generateAvailableKey(String email) {
        return StringFormat.EMAIL_AVAILABLE_PREFIX + email;
    }
}
