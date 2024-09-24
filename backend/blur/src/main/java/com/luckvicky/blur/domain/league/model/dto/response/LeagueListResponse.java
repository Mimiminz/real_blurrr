package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "리그 목록 조회 응답")
public record LeagueListResponse(
        @Schema(description = "조회한 리그 목록")
        List<LeagueDto> leagues
) {

    public static LeagueListResponse of(List<LeagueDto> leagues) {
        return LeagueListResponse.builder()
                .leagues(leagues)
                .build();
    }

}
