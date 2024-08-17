package com.luckvicky.blur.infra.redis.service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisAuthCodeAdapter implements RedisAdapter {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisAuthCodeAdapter(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveOrUpdate(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void saveOrUpdate(String key, String value, int min) {
        redisTemplate.opsForValue().set(key, value, min, TimeUnit.MINUTES);
    }

    @Override
    public Optional<String> getValue(String key) {
        Object value = redisTemplate.opsForValue().get(key);
        if (value instanceof String) {
            return Optional.of((String) value);
        }
        return Optional.empty();
    }

    @Override
    public void delete(String key) {
        redisTemplate.opsForHash().delete(key);
    }

}
