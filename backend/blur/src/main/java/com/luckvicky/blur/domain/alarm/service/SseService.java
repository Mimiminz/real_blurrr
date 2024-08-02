package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.alarm.repository.SseEmitterRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.constant.StringFormat;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class SseService {

    private final SseEmitterRepository sseEmitterRepository;

    @Value("${sse.time.timeout}")
    private long TIMEOUT;

    public SseService(SseEmitterRepository sseEmitterRepository) {
        this.sseEmitterRepository = sseEmitterRepository;
    }

    public SseEmitter subscribe(UUID memberId) {
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        sseEmitterRepository.save(memberId, sseEmitter);

        //연결이 정상적으로 종료되었을 때
        sseEmitter.onCompletion(() -> {
            sseEmitterRepository.deleteById(memberId);
        });
        //지정한 시간이 지나 연결이 타임아웃되었을 때
        sseEmitter.onTimeout(sseEmitter::complete);
        //클라이언트와의 연결에 오류가 발생했을 때
        sseEmitter.onError((e) -> {
            sseEmitterRepository.deleteById(memberId);
        });

        send(StringFormat.SUBSCRIBE, "subscribe [member = " + memberId.toString() + "]", memberId, sseEmitter);
        return sseEmitter;
    }

    @Async
    @Transactional
    public void sendAlarm(AlarmEvent alarmEvent, Alarm alarm) {
        sseEmitterRepository.findById(alarmEvent.memberId())
                .ifPresent(sseEmitter -> send(alarmEvent.alarmType().name(), AlarmDto.of(alarm),alarmEvent.memberId(), sseEmitter));
    }

    public void send(String event, Object data, UUID memberId, SseEmitter sseEmitter) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .name(event)
                    .id(memberId.toString())
                    .data(data, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitterRepository.deleteById(memberId);
        }
    }
}
