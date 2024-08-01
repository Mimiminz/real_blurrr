package com.luckvicky.blur.domain.alarm.model.entity;

import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.DynamicUpdate;

@Builder
@Getter
@DynamicUpdate
@Table(name = "alarms")
@Entity
public class Alarm extends BaseEntity {
    @Column(nullable = false)
    private String title;

    private String link;

    private String message;

    private boolean isRead;

    @Enumerated(EnumType.STRING)
    private AlarmType alarmType;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public Alarm(String title, String link, String message, boolean isRead, AlarmType alarmType, Member member) {
        this.title = title;
        this.link = link;
        this.message = message;
        this.isRead = isRead;
        this.alarmType = alarmType;
        this.member = member;
    }

    public Alarm() {
        super();
    }

    public void changeRead() {
        this.isRead = true;
    }

    public void addMember(Member member) {
        this.member = member;
    }
}
