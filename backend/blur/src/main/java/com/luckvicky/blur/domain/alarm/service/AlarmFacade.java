package com.luckvicky.blur.domain.alarm.service;

import static com.luckvicky.blur.global.constant.Number.ALARM_PAGE_SIZE;

import com.luckvicky.blur.domain.alarm.factory.NotificationFactory;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
public class AlarmFacade {
    private final SseService sseService;
    private final AlarmService alarmService;
    private final Map<AlarmType, NotificationFactory> factoryMap;
    private final MemberRepository memberRepository;

    public AlarmFacade(SseService sseService, AlarmService alarmService, Map<AlarmType, NotificationFactory> factoryMap,
                       MemberRepository memberRepository) {

        this.sseService = sseService;
        this.alarmService = alarmService;
        this.factoryMap = factoryMap;
        this.memberRepository = memberRepository;
    }

    public SseEmitter subscribe(UUID memberId) {
        return sseService.subscribe(memberId);
    }

    @Async
    @Transactional
    public void sendAlarm(UUID memberId, AlarmType alarmType, String... args) {
        if (alarmType == null) {
            throw new IllegalArgumentException("Cannot null alarm type");
        }
        Member member = memberRepository.getOrThrow(memberId);

        NotificationFactory factory = factoryMap.get(alarmType);

        AlarmEvent alarmEvent = new AlarmEvent(memberId, alarmType, factory.createNotification(args));
        Alarm alarm = alarmService.createAlarm(alarmEvent, member);

        sseService.sendAlarm(alarmEvent, alarm);
    }

    public List<AlarmDto> findAlarms(UUID memberId, int pageNo) {
        Member member = memberRepository.getOrThrow(memberId);
        Pageable pageable = PageRequest.of(pageNo, ALARM_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.valueOf("TIME").getCriteria()));
        return alarmService.findAlarms(member, pageable);
    }

    public Boolean modifyReadStatus(UUID memberId, UUID alarmId) {
        Member member = memberRepository.getOrThrow(memberId);
        alarmService.modifyReadStatus(member, alarmId);
        return true;
    }
}
