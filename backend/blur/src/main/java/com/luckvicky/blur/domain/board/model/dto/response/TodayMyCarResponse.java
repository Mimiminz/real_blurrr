package com.luckvicky.blur.domain.board.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "오늘의차 조회 응답")
public record TodayMyCarResponse(
        @Schema(description = "오늘의 차 정보")
        MyCarDto myCar
) {

    public static TodayMyCarResponse of(MyCarDto myCar) {
        return TodayMyCarResponse.builder()
                .myCar(myCar)
                .build();
    }

}
