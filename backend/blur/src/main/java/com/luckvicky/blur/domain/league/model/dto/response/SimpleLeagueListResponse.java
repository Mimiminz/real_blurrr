package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.SimpleLeagueDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "리그 이름 목록 조회 응답")
public record SimpleLeagueListResponse (

    @Schema(description = "조회한 리그 이름 목록")
    List<SimpleLeagueDto> leagues
){
    public static SimpleLeagueListResponse of(List<SimpleLeagueDto> leagues) {
        return SimpleLeagueListResponse.builder()
                .leagues(leagues)
                .build();
    }
}
