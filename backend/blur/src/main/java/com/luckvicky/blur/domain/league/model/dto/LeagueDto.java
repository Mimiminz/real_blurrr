package com.luckvicky.blur.domain.league.model.dto;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "리그 정보")
public class LeagueDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "이름")
    private String name;

    @Schema(description = "유형")
    private LeagueType type;

    @Schema(description = "인원수")
    private Long peopleCount;

}
