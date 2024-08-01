package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class NotificationEventPublisher {

    private final ApplicationEventPublisher eventPublisher; // 이벤트 발행을 처리하는 인터페이스

    public void publishEvent(AlarmEvent event) {
        eventPublisher.publishEvent(event); // publishEvent()로 이벤트를 발행한다.
    }
}
