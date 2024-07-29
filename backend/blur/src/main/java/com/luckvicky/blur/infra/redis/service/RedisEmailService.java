package com.luckvicky.blur.infra.redis.service;

import com.luckvicky.blur.global.constant.StringFormat;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisEmailService implements RedisAdapter {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${email.valid.time}")
    private long validTime;

    public RedisEmailService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveOrUpdate(String key, String value) {
        redisTemplate.opsForValue().set(generateKey(key), value, validTime, TimeUnit.MILLISECONDS);
    }

    @Override
    public String getValue(String key) {
        return (String) redisTemplate.opsForValue().get(generateKey(key));
    }

    @Override
    public void delete(String key) {
        redisTemplate.opsForHash().delete(generateKey(key));
    }

    private String generateKey(String key) {
        return StringFormat.EMAIL_AUTH_PREFIX + key;
    }
}
