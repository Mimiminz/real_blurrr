package com.luckvicky.blur.domain.member.factory;

import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.global.util.UuidUtil;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PasswordAuthFactory implements AuthCodeFactory{
    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    public PasswordAuthFactory(RedisAuthCodeAdapter redisAuthCodeAdapter) {
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
