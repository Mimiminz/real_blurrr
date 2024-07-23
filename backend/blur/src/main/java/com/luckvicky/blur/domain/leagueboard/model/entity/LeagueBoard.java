package com.luckvicky.blur.domain.leagueboard.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LeagueBoard extends Board {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id", columnDefinition = "BINARY(36)")
    League league;

    public LeagueBoard(String title, String content, BoardType type, Member member, League league) {
        super(title, content, type, member);
        this.league = league;
    }

}
