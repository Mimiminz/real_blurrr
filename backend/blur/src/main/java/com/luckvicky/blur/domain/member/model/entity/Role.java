package com.luckvicky.blur.domain.member.model.entity;

import static com.luckvicky.blur.global.constant.StringFormat.ADMIN;
import static com.luckvicky.blur.global.constant.StringFormat.AUTH_USER;
import static com.luckvicky.blur.global.constant.StringFormat.BASIC_USER;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    ROLE_AUTH_USER(AUTH_USER),
    ROLE_BASIC_USER(BASIC_USER),
    ROLE_ADMIN(ADMIN);

    private final String value;



}
