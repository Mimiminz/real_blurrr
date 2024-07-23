package com.luckvicky.blur.global.model.entity;

import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.ClockUtil;
import com.luckvicky.blur.global.util.UuidUtil;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@SuperBuilder
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ActivateStatus status;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public void active() {
        this.status = ActivateStatus.ACTIVE;
    }

    public void inactive() {
        this.status = ActivateStatus.INACTIVE;
    }

    @PrePersist
    public void onPrePersist() {
        this.id = UuidUtil.createSequentialUUID();
        this.status = ActivateStatus.ACTIVE;
        this.createdAt = ClockUtil.getLocalDateTime();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    public void onPreUpdate() {
        this.updatedAt = ClockUtil.getLocalDateTime();
    }

}
