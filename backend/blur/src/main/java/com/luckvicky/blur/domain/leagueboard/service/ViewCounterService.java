package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.infra.redis.service.RedisViewCountAdapter;
import com.luckvicky.blur.infra.redisson.DistributedLock;
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
public class ViewCounterService {

    private final RedisViewCountAdapter redisViewCountAdapter;
    private final BoardRepository boardRepository;

    @Scheduled(cron = "0 0/2 * * * ?")
    public void syncViewCount() {

        Map<Object, Object> viewCountLog = redisViewCountAdapter.getViewCountLog();

        if (Objects.nonNull(viewCountLog)) {

            for (Map.Entry<Object, Object> entry : viewCountLog.entrySet()) {

                UUID boardId = UUID.fromString((String) entry.getKey());
                String viewCount = (String) entry.getValue();

                if (Objects.nonNull(viewCount)) {
                    log.info("update view count : {} {}", boardId, viewCount);
                    redisViewCountAdapter.deleteViewCountLog(boardId);
                    boardRepository.updateViewCount(boardId, Long.parseLong(viewCount));
                }

            }

        }

    }

    public void increase(UUID boardId) {
        log.info("logging view count : {}", boardId);
        redisViewCountAdapter.incrementViewCount(boardId);
    }

}
