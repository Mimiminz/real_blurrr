package com.luckvicky.blur.domain.member.factory;

import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.global.util.UuidUtil;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PasswordAuthFactory implements AuthCodeFactory{
    private final RedisAuthCodeAdapter redisAuthCodeAdapter;

    @Value("${email.time.valid}")
    private long validTime;

    public PasswordAuthFactory(RedisAuthCodeAdapter redisAuthCodeAdapter) {
        this.redisAuthCodeAdapter = redisAuthCodeAdapter;
    }

    @Override
    public String creatAuthCode() {
        return UuidUtil.createSequentialUUID().toString().substring(0,8);
    }

    @Override
    public void saveCode(String key, String code) {
        redisAuthCodeAdapter.saveOrUpdate(key, code, validTime);
    }

    @Override
    public String generateKey(String email) {
        return StringFormat.PASSWORD_AUTH_PREFIX + email;
    }
}
