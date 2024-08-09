package com.luckvicky.blur.domain.dashcam.model.dto.request;

import com.luckvicky.blur.domain.dashcam.model.entity.Video;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "비디오 생성 요청")
public record VideoCreateRequest (

    @Schema(description = "비디오 순서", example = "1")
    int videoOrder,

    @NotBlank
    @Schema(description = "비디오 url", example = "http://example.com/video1.mp4")
    String videoUrl
) {
    public Video toEntity(){
        return Video.builder().
                videoOrder(videoOrder)
                .videoUrl(videoUrl)
                .build();
    }
}
