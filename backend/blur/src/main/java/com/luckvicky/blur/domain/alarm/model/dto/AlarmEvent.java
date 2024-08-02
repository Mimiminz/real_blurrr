package com.luckvicky.blur.domain.alarm.model.dto;

import com.luckvicky.blur.domain.alarm.factory.notification.Notification;
import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import java.util.UUID;

public record AlarmEvent(
        UUID memberId,
        AlarmType alarmType,
        Notification alarm
) {
}
