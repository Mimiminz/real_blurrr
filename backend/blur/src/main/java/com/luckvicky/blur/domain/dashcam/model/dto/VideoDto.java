package com.luckvicky.blur.domain.dashcam.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "비디오 정보")
public class VideoDto {

    @Schema(description = "비디오 순서")
    private int videoOrder;

    @Schema(description = "비디오 url")
    private String videoUrl;

    public static VideoDto of(int order, String url) {
        return VideoDto.builder()
                .videoOrder(order)
                .videoUrl(url)
                .build();
    }

}
