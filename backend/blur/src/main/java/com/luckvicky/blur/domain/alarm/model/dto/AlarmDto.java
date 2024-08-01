package com.luckvicky.blur.domain.alarm.model.dto;

import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "알림")
public record AlarmDto(
        String title,
        String message,
        String link
) {
    public static AlarmDto of(Alarm alarm) {
        return AlarmDto.builder()
                .link(alarm.getLink())
                .message(alarm.getMessage())
                .title(alarm.getTitle())
                .build();
    }
}
