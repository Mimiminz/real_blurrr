package com.luckvicky.blur.domain.league.model.entity;

import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum LeagueType {

    BRAND(
            Set.of(
            "현대",  "제네시스", "기아", "르노", "쉐보레", "벤츠", "BMW", "아우디"
            )
    ),

    MODEL(
            Set.of(
            "소나타", "GV70", "K5", "QM6", "트랙스", "G바겐", "520i", "A7"
            )
    );

    private final Set<String> names;

}
