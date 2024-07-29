package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "리그 랭킹 조회 응답")
public record LeagueRankingResponse(
        @Schema(description = "리그 목록")
        List<LeagueDto> leagues
) {

    public static LeagueRankingResponse of(List<LeagueDto> leagues) {
        return LeagueRankingResponse.builder()
                .leagues(leagues)
                .build();
    }

}
