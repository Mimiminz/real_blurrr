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
@Table(name = "leagues")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class League extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private LeagueType type;

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL, orphanRemoval = true)
    List<LeagueBoard> leagueBoards;

    @Column(nullable = false)
    private Long peopleCount;

    @Builder
    public League (String name, LeagueType type, Long peopleCount) {
        this.name = name;
        this.type = type;
        this.peopleCount = peopleCount;
    }

    public void increasePeopleCount() {
        this.peopleCount++;
    }

    public void decreasePeopleCount() {
        this.peopleCount--;
    }

}
