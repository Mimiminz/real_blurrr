package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.infra.redis.service.RedisBoardAdapter;
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

    private final RedisBoardAdapter redisBoardAdapter;
    private final BoardRepository boardRepository;

    @Scheduled(cron = "0 0/7 * * * ?")
    public void syncViewCount() {

        Map<Object, Object> viewCountLog = redisBoardAdapter.getViewCountLogs();

        if (Objects.nonNull(viewCountLog)) {

            for (Map.Entry<Object, Object> entry : viewCountLog.entrySet()) {

                UUID boardId = UUID.fromString((String) entry.getKey());
                String viewCount = (String) entry.getValue();

                if (Objects.nonNull(viewCount)) {
                    log.info("update view count : {} {}", boardId, viewCount);
                    redisBoardAdapter.deleteViewCountLog(boardId);
                    boardRepository.updateViewCount(boardId, Long.parseLong(viewCount));
                }

            }

        }

    }

    public long increment(UUID boardId, UUID memberId) {

        log.info("Logging view count:{}", boardId);
        redisBoardAdapter.addVisitLog(boardId.toString(), memberId.toString());
        return redisBoardAdapter.incrementViewCount(boardId.toString());

    }

    public long getViewCountInRedis(UUID boardId) {
        return redisBoardAdapter.getViewCountLogByBoard(boardId.toString());
    }


    public long addViewCountInRedis(UUID boardId, long viewCount) {

        long viewCountInRedis = redisBoardAdapter.getViewCountLogByBoard(boardId.toString());

        if (viewCountInRedis > 0) {
            return viewCount + viewCountInRedis;
        }

        return viewCount;

    }

    public Boolean isVisited(UUID boardId, UUID memberId) {
        log.info("Already visited member of board:{}", boardId);
        return redisBoardAdapter.getVisitLog(boardId.toString(), memberId.toString());
    }


}
