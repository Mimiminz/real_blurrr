package com.luckvicky.blur.infra.mail.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
public class AuthEmailForm extends EmailForm {
    private String code;
}
