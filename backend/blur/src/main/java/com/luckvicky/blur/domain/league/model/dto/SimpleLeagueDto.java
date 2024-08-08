package com.luckvicky.blur.domain.league.model.dto;

import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "리그 이름 정보")
public class SimpleLeagueDto {

    @Schema(description = "이름")
    private String name;

    public static SimpleLeagueDto of(League league) {
        return SimpleLeagueDto.builder()
                .name(league.getName())
                .build();
    }

}
