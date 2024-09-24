package com.luckvicky.blur.domain.alarm.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "알림")
public record AlarmDto(
        UUID id,
        String title,
        String message,
        String link,
        boolean isRead,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createDt
) {
    public static AlarmDto of(Alarm alarm) {
        return AlarmDto.builder()
                .id(alarm.getId())
                .link(alarm.getLink())
                .message(alarm.getMessage())
                .title(alarm.getTitle())
                .isRead(alarm.isRead())
                .createDt(alarm.getCreatedAt())
                .build();
    }
}
