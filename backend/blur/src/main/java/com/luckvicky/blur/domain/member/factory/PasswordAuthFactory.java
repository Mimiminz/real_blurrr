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
    public String creatAuthCode() {
        return UUID.randomUUID().toString().substring(0,8);
    }

    @Override
    public void saveCode(String key, String code) {
        redisAuthCodeAdapter.saveOrUpdate(key, code, 5);
    }

    @Override
    public String generateKey(String email) {
        return StringFormat.PASSWORD_AUTH_PREFIX + email;
    }
}
