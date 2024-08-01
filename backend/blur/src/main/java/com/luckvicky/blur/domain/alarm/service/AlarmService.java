package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {
    SseEmitter subscribe(UUID memberId);
    void sendAlarm(AlarmEvent alarm);
    List<AlarmDto> findAlarms(UUID memberId, Pageable pageable);

    boolean modifyReadStatus(UUID memberId, UUID alarmId);
}
