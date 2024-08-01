package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.alarm.repository.AlarmRepository;
import com.luckvicky.blur.domain.alarm.repository.SseEmitterRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.io.IOException;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class AlarmServiceImpl implements AlarmService {

    private final SseEmitterRepository sseEmitterRepository;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;

    public AlarmServiceImpl(SseEmitterRepository sseEmitterRepository, MemberRepository memberRepository,
                            AlarmRepository alarmRepository) {
        this.sseEmitterRepository = sseEmitterRepository;
        this.memberRepository = memberRepository;
        this.alarmRepository = alarmRepository;
    }

    @Override
    public SseEmitter subscribe(UUID memberId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitterRepository.save(memberId, sseEmitter);

        sseEmitter.onCompletion(() -> sseEmitterRepository.deleteById(memberId));
        sseEmitter.onTimeout(() -> sseEmitterRepository.deleteById(memberId));
        sseEmitter.onError((e) -> sseEmitterRepository.deleteById(memberId));

        send("subscribe [member = " + memberId.toString() + "]", memberId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void sendAlarm(AlarmEvent alarmEvent) {
        Member member = memberRepository.getOrThrow(alarmEvent.memberId());

        Alarm alarm = createAlarm(alarmEvent);

        alarm.addMember(member);
        alarmRepository.save(alarm);

        sseEmitterRepository.findById(member.getId())
                .ifPresent(sseEmitter -> send(AlarmDto.of(alarm),member.getId(), sseEmitter));
    }

    private void send(Object data, UUID memberId, SseEmitter sseEmitter) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(memberId.toString())
                    .data(data, MediaType.APPLICATION_JSON));
        } catch (IOException e) {
            sseEmitterRepository.deleteById(memberId);
        }
    }

    private Alarm createAlarm(AlarmEvent alarmEvent) {
        return Alarm.builder()
                .alarmType(alarmEvent.alarmType())
                .message(alarmEvent.content())
                .title(alarmEvent.title())
                .link(alarmEvent.link())
                .build();
    }
}
