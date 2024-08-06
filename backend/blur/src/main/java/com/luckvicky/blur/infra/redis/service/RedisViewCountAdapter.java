package com.luckvicky.blur.infra.redis.service;

import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisViewCountAdapter {

    private static final String HASH_KEY = "view:count:";
    private final RedisTemplate<String, Object> redisTemplate;

    public void incrementViewCount(UUID boardId) {
        redisTemplate.opsForHash().increment(HASH_KEY, boardId.toString(), 1);
    }

    public Map<Object, Object> getViewCountLog() {
        return redisTemplate.opsForHash().entries(HASH_KEY);
    }

    public void deleteViewCountLog(UUID boardId) {
        redisTemplate.opsForHash().delete(HASH_KEY, boardId.toString());

    }

}
