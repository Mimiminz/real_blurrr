package com.luckvicky.blur.domain.member.model.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    ROLE_AUTH_USER("ROLE_AUTH_USER", "AUTH_USER"),
    ROLE_BASIC_USER("ROLE_BASIC_USER", "BASIC_USER"),
    ROLE_ADMIN("ROLE_ADMIN", "ADMIN");

    private final String authority;
    private final String role;

}
