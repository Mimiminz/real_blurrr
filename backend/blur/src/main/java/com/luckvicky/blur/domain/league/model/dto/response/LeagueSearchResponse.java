package com.luckvicky.blur.domain.league.model.dto.response;

import com.luckvicky.blur.infra.elasticsearch.document.LeagueDocument;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "리그 검색 응답")
public record LeagueSearchResponse(

        @Schema(description = "리그 고유 식별값")
        UUID id,

        @Schema(description = "이름")
        String name

) {

    public static LeagueSearchResponse of(LeagueDocument league) {
        return LeagueSearchResponse.builder()
                .id(league.getId())
                .name(league.getName())
                .build();
    }

}
