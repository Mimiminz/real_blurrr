package com.luckvicky.blur.domain.vote.model.entity;

import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "votes",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uniqueVote",
                        columnNames = {"board_id", "member_id"})
        })
public class Vote extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dashcam_id")
    private DashCam dashCam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id", nullable = false)
    private Option selectedOption;

    @Builder
    public Vote(DashCam dashCam, Member member, Option selectedOption) {
        this.dashCam = dashCam;
        this.member = member;
        this.selectedOption = selectedOption;
    }

    public void setDashCam(DashCam dashCam) {
        this.dashCam = dashCam;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setSelectedOption(Option selectedOption) {
        this.selectedOption = selectedOption;
    }
}
