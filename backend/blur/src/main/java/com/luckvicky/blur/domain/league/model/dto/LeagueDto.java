package com.luckvicky.blur.domain.league.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(name = "리그 정보")
public class LeagueDto {

    @Schema(description = "고유 식별값")
    String id;

    @Schema(description = "이름")
    String name;

    @Schema(description = "유형")
    String type;

}
