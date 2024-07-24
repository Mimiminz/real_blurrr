package com.luckvicky.blur.domain.dashcamboard.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dashcams")
public class Dashcam extends Board {

    @ElementCollection
    @CollectionTable(name = "options", joinColumns = @JoinColumn(name = "id"))
    private List<Option> options = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "videos", joinColumns = @JoinColumn(name = "id"))
    private List<Video> videos = new ArrayList<>();

}


