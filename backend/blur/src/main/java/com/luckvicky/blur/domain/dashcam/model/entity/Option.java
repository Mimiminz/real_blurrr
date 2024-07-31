package com.luckvicky.blur.domain.dashcam.model.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Option {
    @Column(name = "num")
    private int num;

    @Column(name = "content", length = 200)
    private String content;
}