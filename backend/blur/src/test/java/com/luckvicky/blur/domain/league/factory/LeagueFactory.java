package com.luckvicky.blur.domain.league.factory;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.UuidUtil;
import org.springframework.test.util.ReflectionTestUtils;

public class LeagueFactory {

    public static String MODEL = "GV70";
    public static String BRAND = "제네시스";

    public static League createModelLeague() {

        League league = League.builder()
                .name(MODEL)
                .type(LeagueType.MODEL)
                .peopleCount(0L)
                .build();

        ReflectionTestUtils.setField(league, "id", UuidUtil.createSequentialUUID());
        return league;

    }

    public static League createBrandLeague() {

        League league = League.builder()
                .name(BRAND)
                .type(LeagueType.BRAND)
                .peopleCount(0L)
                .build();

        ReflectionTestUtils.setField(league, "id", UuidUtil.createSequentialUUID());
        return league;

    }


}
