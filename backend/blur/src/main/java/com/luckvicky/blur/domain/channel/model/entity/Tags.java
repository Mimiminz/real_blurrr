package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="Tag")
public class Tags {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name="name",nullable = false, length = 20)
    private String name;

    public Tags() {
    }

    public Tags(UUID id, String name) {
        this.id = id;
        this.name = name;
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
}
