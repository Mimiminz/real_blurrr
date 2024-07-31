package com.luckvicky.blur.domain.member.factory;

import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.stereotype.Component;

@Component
public class EmailAuthStrategy implements AuthCodeStrategy {

    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    public EmailAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
    }

    @Override
    public void saveToRedis(String key, String code) {
        redisAuthCodeAdapter.saveOrUpdate(key, code, 10);
    }

    @Override
    public String generateKey(String email) {
        return StringFormat.EMAIL_AUTH_PREFIX + email;
    }

    public void pushAvailableEmail(String email) {
        redisAuthCodeAdapter.saveOrUpdate(generateAvailableKey(email), String.valueOf(true), 720);
    }

    public String generateAvailableKey(String email) {
        return StringFormat.EMAIL_AVAILABLE_PREFIX + email;
    }
}
