package com.luckvicky.blur.infra.redis.service;

import com.luckvicky.blur.global.constant.StringFormat;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisRefreshTokenAdapter implements RedisAdapter {
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${jwt.expire.time.refresh}")
    long expireRefreshToken;

    public RedisRefreshTokenAdapter(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveOrUpdate(String key, String value) {
        redisTemplate.opsForValue().set(generateKey(key), value, expireRefreshToken, TimeUnit.MILLISECONDS);
    }

    @Override
    public Optional<String> getValue(String key) {
        Object value = redisTemplate.opsForValue().get(generateKey(key));
        if (value instanceof String) {
            return Optional.of((String) value);
        }
        return Optional.empty();
    }

    @Override
    public void delete(String key) {
        redisTemplate.delete(generateKey(key));
    }

    private String generateKey(String userId) {
        return StringFormat.REFRESH_TOKEN_PREFIX + userId;
    }
}
