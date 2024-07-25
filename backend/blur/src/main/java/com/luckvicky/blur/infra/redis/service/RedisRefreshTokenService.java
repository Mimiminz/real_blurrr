package com.luckvicky.blur.infra.redis.service;

import com.luckvicky.blur.global.constant.StringFormat;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisRefreshTokenService {
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${jwt.expire.time.refresh}")
    long expireRefreshToken;

    public RedisRefreshTokenService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveOrUpdateRefreshToken(String userId, String refreshToken) {
        String key = generateKey(userId);
        redisTemplate.opsForValue().set(key, refreshToken, expireRefreshToken, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String userId) {
        String key = generateKey(userId);
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void deleteRefreshToken(String userId) {
        String key = generateKey(userId);
        redisTemplate.delete(key);
    }

    private String generateKey(String userId) {
        return StringFormat.REFRESH_TOKEN_PREFIX + userId;
    }
}
