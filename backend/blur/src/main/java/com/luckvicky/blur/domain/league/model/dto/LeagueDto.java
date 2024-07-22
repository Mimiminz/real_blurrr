package com.luckvicky.blur.domain.league.model.dto;

import java.util.UUID;

public record LeagueDto(
        UUID uuid,
        String name,
        String type
) {
}
