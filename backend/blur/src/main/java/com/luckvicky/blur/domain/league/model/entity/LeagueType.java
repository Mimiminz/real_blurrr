package com.luckvicky.blur.domain.league.model.entity;

import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LeagueType {

    BRAND, MODEL;

    public static LeagueType convertToEnum(String type) {

        LeagueType leagueType;

        try {
            leagueType = LeagueType.valueOf(type);
        } catch (IllegalArgumentException e) {
            throw new InvalidLeagueTypeException();
        }

        return leagueType;

    }

}
