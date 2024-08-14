package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.infra.redis.service.RedisLeagueBoardAdapter;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisViewCounterService {

    private final RedisLeagueBoardAdapter redisLeagueBoardAdapter;
    private final BoardRepository boardRepository;

    @Scheduled(cron = "0 0/7 * * * ?")
    public void syncViewCount() {

        Map<Object, Object> viewCountLog = redisLeagueBoardAdapter.getViewCountLogs();

        if (Objects.nonNull(viewCountLog)) {

            for (Map.Entry<Object, Object> entry : viewCountLog.entrySet()) {

                UUID boardId = UUID.fromString((String) entry.getKey());
                String viewCount = (String) entry.getValue();

                if (Objects.nonNull(viewCount)) {
                    log.info("update view count : {} {}", boardId, viewCount);
                    redisLeagueBoardAdapter.deleteViewCountLog(boardId);
                    boardRepository.updateViewCount(boardId, Long.parseLong(viewCount));
                }

            }

        }

    }

    public long increment(UUID boardId) {

        log.info("Logging view count:{}", boardId);
        return redisLeagueBoardAdapter.incrementViewCount(boardId.toString());

    }


    public long addViewCountInRedis(UUID boardId, long viewCount) {

        long viewCountInRedis = redisLeagueBoardAdapter.getViewCountLogByBoard(boardId.toString());

        if (viewCountInRedis > 0) {
            return viewCount + viewCountInRedis;
        }

        return viewCount;

    }


}
