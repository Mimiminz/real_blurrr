package com.luckvicky.blur.domain.dashcamboard.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Video{
    @Column(name = "video_url", length = 512)
    private String videoUrl;
}