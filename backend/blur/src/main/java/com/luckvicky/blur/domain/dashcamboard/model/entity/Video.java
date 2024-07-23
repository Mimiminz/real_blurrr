package com.luckvicky.blur.domain.dashcamboard.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Video{
    @Column(name = "video_url", length = 512)
    private String videoUrl;
}