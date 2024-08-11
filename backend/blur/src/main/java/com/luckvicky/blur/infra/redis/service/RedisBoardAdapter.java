package com.luckvicky.blur.infra.redis.service;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisBoardAdapter {

    private static final String BOARD_VIEW_COUNT_HASH_KEY = "board:viewCount:";
    private static final String BOARD_MEMBER_KEY = "board:%s:member:%s";

    private final RedisTemplate<String, Object> redisTemplate;

    public void addVisitLog(String boardId, String memberId) {
        redisTemplate.opsForValue().set(
                String.format(BOARD_MEMBER_KEY, boardId, memberId), memberId, 1, TimeUnit.MINUTES
        );
    }

    public boolean getVisitLog(String boardId, String memberId) {

        Boolean isVisited = redisTemplate.hasKey(
                String.format(BOARD_MEMBER_KEY, boardId, memberId)
        );

        if (Boolean.TRUE.equals(isVisited)) {
            return true;
        }

        return false;

    }

    public Long incrementViewCount(String boardId) {
        return redisTemplate.opsForHash().increment(BOARD_VIEW_COUNT_HASH_KEY, boardId, 1);
    }

    public Map<Object, Object> getViewCountLogs() {
        return redisTemplate.opsForHash().entries(BOARD_VIEW_COUNT_HASH_KEY);
    }

    public long getViewCountLogByBoard(String boardId) {

        Map<Object, Object> viewCountLogs = getViewCountLogs();

        if (Objects.nonNull(viewCountLogs)) {

            String viewCountInRedis = (String) viewCountLogs.get(boardId);

            if (Objects.nonNull(viewCountInRedis)) {
                return Long.parseLong(viewCountInRedis);
            }

        }

        return 0;

    }

    public void deleteViewCountLog(UUID boardId) {
        redisTemplate.opsForHash().delete(BOARD_VIEW_COUNT_HASH_KEY, boardId.toString());

    }

}
