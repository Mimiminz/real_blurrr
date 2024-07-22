package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import lombok.Builder;

@Builder
public record LeagueListResponse(
        Iterable<LeagueDto> leagues
) {

    public static LeagueListResponse of(Iterable<LeagueDto> leagues) {
        return LeagueListResponse.builder()
                .leagues(leagues)
                .build();
    }

}
