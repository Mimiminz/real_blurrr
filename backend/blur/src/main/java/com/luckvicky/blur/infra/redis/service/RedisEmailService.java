package com.luckvicky.blur.infra.redis.service;

import com.luckvicky.blur.global.constant.StringFormat;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisEmailService implements RedisAdapter {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${email.time.valid}")
    private long validTime;

    @Value("${email.time.available}")
    private long availableTime;

    public RedisEmailService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveOrUpdate(String key, String value) {
        redisTemplate.opsForValue().set(generateKey(key), value, validTime, TimeUnit.MILLISECONDS);
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
        redisTemplate.opsForHash().delete(generateKey(key));
    }

    public void saveAuthEmail(String email) {
        redisTemplate.opsForValue().set(generateAvailableKey(email) ,true, availableTime, TimeUnit.MILLISECONDS);
    }

    public Boolean getAuthEmail(String email) {
        return (Boolean) redisTemplate.opsForValue().get(generateAvailableKey(email));
    }

    private String generateAvailableKey(String email) {
        return StringFormat.EMAIL_AVAILABLE_PREFIX + email;
    }

    private String generateKey(String key) {
        return StringFormat.EMAIL_AUTH_PREFIX + key;
    }
}
