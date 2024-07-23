package com.luckvicky.blur.domain.dashcamboard.model.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Option {
    @Column(name = "num")
    private int num;

    @Column(name = "content", length = 200)
    private String content;
}