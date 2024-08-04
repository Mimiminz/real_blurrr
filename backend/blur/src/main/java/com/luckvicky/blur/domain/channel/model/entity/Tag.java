package com.luckvicky.blur.domain.channel.model.entity;

import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="tags")
public class Tag extends BaseEntity {

    @Column(unique = true,nullable = false, length = 20)
    private String name;

    @Builder
    public Tag(String name) {
        this.name = name;
    }
}
