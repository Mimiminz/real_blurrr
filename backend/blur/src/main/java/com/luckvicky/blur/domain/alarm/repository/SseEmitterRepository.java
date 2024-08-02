package com.luckvicky.blur.domain.alarm.repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Repository
public class SseEmitterRepository {
    private final Map<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter save(UUID memberId, SseEmitter sseEmitter) {
        emitters.put(memberId, sseEmitter);

        return sseEmitter;
    }

    public Optional<SseEmitter> findById(UUID memberId) {
        return Optional.ofNullable(emitters.get(memberId));
    }

    public void deleteById(UUID memberId) {
        emitters.remove(memberId);
    }
}
