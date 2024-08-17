package com.luckvicky.blur.infra.jwt.model;

import com.luckvicky.blur.domain.member.model.entity.Role;
import java.util.UUID;
import lombok.Getter;

@Getter
public class ContextMember   {

    private UUID id;
    private String email;
    private Role role;

    public ContextMember(UUID id, String email, Role role) {
        this.id = id;
        this.email = email;
        this.role = role;
    }

}
