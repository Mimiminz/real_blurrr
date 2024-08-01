package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import java.util.UUID;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {
    SseEmitter subscribe(UUID memberId);
    void sendAlarm(AlarmEvent alarm);
}
