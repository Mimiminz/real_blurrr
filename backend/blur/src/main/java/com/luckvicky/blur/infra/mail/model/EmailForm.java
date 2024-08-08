package com.luckvicky.blur.infra.mail.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@EqualsAndHashCode
@Setter
@Getter
public class EmailForm {
    private String to;
    protected String subject;
    protected String content;
    protected boolean isHtml;
}
