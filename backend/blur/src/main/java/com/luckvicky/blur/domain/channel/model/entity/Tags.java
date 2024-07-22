package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.validator.constraints.UUID;

import java.util.Set;

@Entity
@Table(name="Tag")
public class Tags {
    @Id
    private UUID id;

    private String name;
}
