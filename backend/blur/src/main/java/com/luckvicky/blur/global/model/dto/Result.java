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

    @Builder //TODO: builder를 굳이 쓸 필요가 있을까? 가독성, 제네릭이슈
    private Result(T data) {
        this.timestamp = ClockUtil.getLocalDateTimeToString();
        this.trackingId = UUID.randomUUID();
        this.data = data;
    }

    public static <T> Result<T> of(T data) {
        return new Result<>(data);
    }

    public static <T> Result<T> empty() {
        return new Result<>(null);
    }

}
