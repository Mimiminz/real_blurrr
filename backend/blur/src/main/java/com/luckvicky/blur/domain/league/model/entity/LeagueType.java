package com.luckvicky.blur.domain.league.model.entity;

import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_BRAND;
import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_MODEL;

import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LeagueType {

    BRAND(LEAGUE_TYPE_BRAND), MODEL(LEAGUE_TYPE_MODEL);

    private final String value;

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
