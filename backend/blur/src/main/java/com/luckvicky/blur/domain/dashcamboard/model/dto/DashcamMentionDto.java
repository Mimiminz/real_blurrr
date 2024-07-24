package com.luckvicky.blur.domain.dashcamboard.model.dto;

import com.luckvicky.blur.domain.dashcamboard.model.entity.DashcamMention;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "멘션 목록 DTO")
public class DashcamMentionDto {

    @Schema(description = "멘션된 리그 ID")
    private UUID id;

    @Schema(description = "멘션된 리그 이름")
    private String name;

    public static DashcamMentionDto from(DashcamMention dashcamMention){
        return DashcamMentionDto.builder()
                .id(dashcamMention.getId())
                .name(dashcamMention.getLeague().getName())
                .build();
    }

}
