package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="channels")
public class Channels {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name="name",nullable = false, length = 20)
    private String name;

    @Column(name="img_url", nullable = false,length = 256)
    private String imgUrl;

    @Column(name="info", nullable = false, length = 50)
    private String info;

    @Column(name="owner")
    private UUID owner;

    public Channels() {
    }

    @Builder
    public Channels(UUID id, String name, String imgUrl, String info, UUID owner) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.info = info;
        this.owner = owner;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public UUID getOwner() {
        return owner;
    }

    public void setOwner(UUID owner) {
        this.owner = owner;
    }
}
