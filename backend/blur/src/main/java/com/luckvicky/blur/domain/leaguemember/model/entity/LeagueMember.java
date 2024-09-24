package com.luckvicky.blur.domain.leaguemember.model.entity;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LeagueMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "league_id", columnDefinition = "BINARY(16)", nullable = false)
    private League league;

    @ManyToOne
    @JoinColumn(name = "member_id", columnDefinition = "BINARY(16)", nullable = false)
    private Member member;

    @Builder
    public LeagueMember(League league, Member member) {
        this.league = league;
        this.member = member;
    }

}
