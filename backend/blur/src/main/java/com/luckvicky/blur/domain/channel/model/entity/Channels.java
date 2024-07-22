package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UUID;

import java.util.Set;

@Entity
@Table(name="channels")
public class Channels {
    @Id
    @Column(name="id")
    private UUID id;

    @Column(name="name",nullable = false, length = 20)
    private String name;

    @Column(name="img_url", nullable = false,length = 256)
    private String imgUrl;

    @Column(name="info", nullable = false, length = 50)
    private String info;

    @Column(name="owner")
    private UUID owner;
}
