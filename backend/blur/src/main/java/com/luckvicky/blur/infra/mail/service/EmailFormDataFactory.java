package com.luckvicky.blur.infra.mail.service;

import com.luckvicky.blur.infra.mail.model.AuthEmailFormData;
import com.luckvicky.blur.infra.mail.model.EmailFormData;
import com.luckvicky.blur.infra.mail.model.EmailFormType;

public class EmailFormDataFactory {
    public static EmailFormData getEmailFormData(EmailFormType emailFormType) {
        if (emailFormType == EmailFormType.SIGNIN_AUTH) return new AuthEmailFormData();

        throw new IllegalArgumentException("Invalid EmailFormType");
    }
}
