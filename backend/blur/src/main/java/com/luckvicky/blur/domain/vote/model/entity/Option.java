package com.luckvicky.blur.domain.vote.model.entity;


import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "options")
public class Option extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dashcam_id", columnDefinition = "BINARY(16)", nullable = false)
    private DashCam dashCam;

    private int optionOrder;

    @Column(length = 200)
    private String content;

    private Long voteCount;

    @Builder
    public Option(DashCam dashCam, int optionOrder, String content) {
        this.dashCam = dashCam;
        this.optionOrder = optionOrder;
        this.content = content;
        this.voteCount = 0L;
    }

    public void increaseVoteCount() {
        this.voteCount++;
    }

}