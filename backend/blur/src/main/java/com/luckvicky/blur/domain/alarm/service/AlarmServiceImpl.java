package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.alarm.repository.AlarmRepository;
import com.luckvicky.blur.domain.alarm.repository.SseEmitterRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.constant.StringFormat;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class AlarmServiceImpl implements AlarmService {

    private final SseEmitterRepository sseEmitterRepository;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;

    @Value("${sse.time.timeout}")
    private long TIMEOUT;

    public AlarmServiceImpl(SseEmitterRepository sseEmitterRepository, MemberRepository memberRepository,
                            AlarmRepository alarmRepository) {
        this.sseEmitterRepository = sseEmitterRepository;
        this.memberRepository = memberRepository;
        this.alarmRepository = alarmRepository;
    }

    @Override
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
    @Override
    public void sendAlarm(AlarmEvent alarmEvent) {
        Member member = memberRepository.getOrThrow(alarmEvent.memberId());

        Alarm alarm = createAlarm(alarmEvent);

        alarm.addMember(member);
        alarmRepository.save(alarm);

        sseEmitterRepository.findById(member.getId())
                .ifPresent(sseEmitter -> send(alarmEvent.alarmType().name(), AlarmDto.of(alarm), member.getId(), sseEmitter));
    }

    @Override
    public List<AlarmDto> findAlarms(UUID memberId, Pageable pageable) {
        Member member = memberRepository.getOrThrow(memberId);
        return alarmRepository.findAllByMember(member, pageable).stream().map(AlarmDto::of).toList();
    }

    @Transactional
    @Override
    public boolean modifyReadStatus(UUID alarmId) {
        Alarm alarm = alarmRepository.getOrThrow(alarmId);

        alarm.changeRead();

        return true;
    }

    private void send(String event, Object data, UUID memberId, SseEmitter sseEmitter) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .name(event)
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
