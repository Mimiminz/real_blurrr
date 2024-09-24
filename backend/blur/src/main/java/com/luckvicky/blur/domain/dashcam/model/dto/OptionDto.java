package com.luckvicky.blur.domain.dashcam.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "옵션 정보")
public class OptionDto {

    @Schema(description = "옵션 고유 식별값")
    private UUID id;

    @Schema(description = "옵션 순서")
    private int optionOrder;

    @Schema(description = "옵션 이름")
    private String content;

    @Schema(description = "투표 수")
    private Long voteCount;


}
