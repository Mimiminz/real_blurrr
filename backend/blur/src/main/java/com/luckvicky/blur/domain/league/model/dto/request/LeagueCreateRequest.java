package com.luckvicky.blur.domain.league.model.dto.request;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "리그 생성 요청")
public record LeagueCreateRequest(

        @Schema(
                description = "이름",
                example = "현대"
        )
        String name,

        @Schema(
                description = "유형 (BRAND or MODEL)",
                example = "BRAND"
        )
        String type
) {

    public League toEntity(LeagueType type) {
        return League.builder()
                .name(this.name)
                .type(type)
                .build();
    }

}
