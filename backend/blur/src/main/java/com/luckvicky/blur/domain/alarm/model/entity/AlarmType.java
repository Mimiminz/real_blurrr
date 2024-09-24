package com.luckvicky.blur.domain.alarm.model.entity;

import lombok.Getter;

@Getter
public enum AlarmType {
    ADD_COMMENT("COMMENT"),
    ADD_RE_COMMENT("RE_COMMENT");

    AlarmType(String type) {
        this.type = type;
    }

    private String type;
}
