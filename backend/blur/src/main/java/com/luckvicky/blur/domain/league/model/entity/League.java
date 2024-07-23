package com.luckvicky.blur.domain.league.model.entity;

import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "leagues")
public class League extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private LeagueType type;

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL, orphanRemoval = true)
    List<LeagueBoard> leagueBoards;

    @Builder
    public League (String name, LeagueType type) {
        this.name = name;
        this.type = type;
    }

}
