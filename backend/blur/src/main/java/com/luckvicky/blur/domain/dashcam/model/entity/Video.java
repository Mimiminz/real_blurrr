package com.luckvicky.blur.domain.dashcam.model.entity;

import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "videos")
public class Video extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dashcam_id", columnDefinition = "BINARY(16)", nullable = false)
    private DashCam dashCam;

    private int videoOrder;

    @Column(name = "url", length = 512)
    private String videoUrl;

    @Builder
    public Video(DashCam dashCam, int videoOrder, String videoUrl) {
        this.dashCam = dashCam;
        this.videoOrder = videoOrder;
        this.videoUrl = videoUrl;
    }

}