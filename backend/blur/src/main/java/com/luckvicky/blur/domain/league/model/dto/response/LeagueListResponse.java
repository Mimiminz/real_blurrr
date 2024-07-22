package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "리그 유형 별 조회 응답")
public record LeagueListResponse(
        @Schema(description = "조회한 리그 목록")
        Iterable<LeagueDto> leagues
) {

    public static LeagueListResponse of(Iterable<LeagueDto> leagues) {
        return LeagueListResponse.builder()
                .leagues(leagues)
                .build();
    }

}
