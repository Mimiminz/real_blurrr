package com.luckvicky.blur.domain.vote.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "투표 결과")
public class VoteResultDto {

    @Schema(description = "투표 여부")
    private boolean hasVoted;

    @Schema(description = "사용자 투표 옵션")
    private UUID selectedOptionId;

    @Schema(description = "옵션 목록")
    private List<OptionDto> options;
}
