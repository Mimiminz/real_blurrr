package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="channels")
public class Channel {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(unique = true ,nullable = false, length = 20)
    private String name;

    @Column(name="img_url", nullable = false,length = 256)
    private String imgUrl;

    @Column(name="info", nullable = false, length = 50)
    private String info;

    @Column(name="owner")
    private UUID owner;


    @Builder
    public Channel(UUID id, String name, String imgUrl, String info, UUID owner) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.info = info;
        this.owner = owner;
    }

}
