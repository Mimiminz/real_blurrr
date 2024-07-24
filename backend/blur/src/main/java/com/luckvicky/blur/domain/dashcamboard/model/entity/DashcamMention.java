package com.luckvicky.blur.domain.dashcamboard.model.entity;

import com.luckvicky.blur.domain.league.model.entity.League;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "Dashcam_mentions")
public class DashcamMention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    UUID id;

    @ManyToOne
    @JoinColumn(name="dashcam_id")
    private Dashcam dashcam;

    @ManyToOne
    @JoinColumn(name = "league_id")
    private League league;

}
