package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class NotificationEventHandler {

    private final AlarmService alarmService;

    @Async
    @EventListener // 이벤트 구독
    public void handleEvent(AlarmEvent event) {
        alarmService.sendAlarm(event); // 알림 발송 메서드
    }
}
