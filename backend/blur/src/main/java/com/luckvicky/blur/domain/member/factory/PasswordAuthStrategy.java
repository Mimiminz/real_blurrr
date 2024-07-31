package com.luckvicky.blur.domain.member.factory;

import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.stereotype.Component;

@Component
public class PasswordAuthStrategy implements AuthCodeStrategy {
    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    public PasswordAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
    }

    @Override
    public void saveToRedis(String key, String code) {
        redisAuthCodeAdapter.saveOrUpdate(key, code, 5);
    }

    @Override
    public String generateKey(String email) {
        return StringFormat.PASSWORD_AUTH_PREFIX + email;
    }

    public void pushAvailableEmail(String email) {
        redisAuthCodeAdapter.saveOrUpdate(generateAvailableKey(email), String.valueOf(true), 5);
    }

    public String generateAvailableKey(String email) {
        return StringFormat.PASSWORD_CHANGE_AVAILABLE_PREFIX + email;
    }
}
