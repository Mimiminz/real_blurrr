package com.luckvicky.blur.global.model.dto;

import com.luckvicky.blur.global.util.ClockUtil;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Result<T> {

    private String timestamp;
    private UUID trackingId;
    private T data;

    @Builder
    private Result(T data) {
        this.timestamp = ClockUtil.getLocalDateTimeToString();
        this.trackingId = UUID.randomUUID();
        this.data = data;
    }

    public static <T> Result<T> of(T data) {
        return new Result<>(data);
    }

}
