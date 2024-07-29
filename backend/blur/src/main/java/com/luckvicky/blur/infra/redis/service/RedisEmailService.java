package com.luckvicky.blur.infra.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisEmailService implements RedisAdapter {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisEmailService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveOrUpdate(String key, String value) {

    }

    @Override
    public String getValue(String key) {
        return "";
    }

    @Override
    public void delete(String key) {

    }
}
