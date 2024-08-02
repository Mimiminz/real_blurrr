package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface AlarmService {
    List<AlarmDto> findAlarms(Member memberId, Pageable pageable);
    Alarm createAlarm(AlarmEvent alarm, Member member);
    void modifyReadStatus(Member memberId, UUID alarmId);
}
