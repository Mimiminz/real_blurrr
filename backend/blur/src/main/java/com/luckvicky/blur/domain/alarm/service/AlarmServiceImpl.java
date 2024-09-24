package com.luckvicky.blur.domain.alarm.service;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmDto;
import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import com.luckvicky.blur.domain.alarm.repository.AlarmRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class AlarmServiceImpl implements AlarmService {

    private final AlarmRepository alarmRepository;

    public AlarmServiceImpl(AlarmRepository alarmRepository) {
        this.alarmRepository = alarmRepository;
    }


    @Override
    public List<AlarmDto> findAlarms(Member member, Pageable pageable) {
        return alarmRepository.findAllByMember(member, pageable).stream().map(AlarmDto::of).toList();
    }

    @Transactional
    @Override
    public void modifyReadStatus(Member member, UUID alarmId) {
        Alarm alarm = alarmRepository.getOrThrow(alarmId, member);
        alarm.changeRead();
    }

    @Override
    public Alarm createAlarm(AlarmEvent alarmEvent, Member member) {
        Alarm alarm = Alarm.builder()
                .alarmType(alarmEvent.alarmType())
                .message(alarmEvent.alarm().getMessage())
                .title(alarmEvent.alarm().getTitle())
                .link(alarmEvent.alarm().getLink())
                .build();

        alarm.addMember(member);
        alarm = alarmRepository.save(alarm);
        return alarm;
    }
}
