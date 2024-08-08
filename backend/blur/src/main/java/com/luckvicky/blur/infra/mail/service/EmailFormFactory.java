package com.luckvicky.blur.infra.mail.service;

import com.luckvicky.blur.infra.mail.model.EmailForm;
import com.luckvicky.blur.infra.mail.model.EmailFormData;

public interface EmailFormFactory {
    EmailForm createEmailForm(String to, boolean isHtml, EmailFormData formData);
}
