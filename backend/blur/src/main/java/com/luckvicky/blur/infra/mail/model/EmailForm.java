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
    private String subject;
    private String content;
    private boolean isHtml;

    public EmailForm() {
    }

    public EmailForm(String to, String subject, String content, boolean isHtml) {
        this.to = to;
        this.subject = subject;
        this.content = content;
        this.isHtml = isHtml;
    }
}
