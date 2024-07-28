package com.luckvicky.blur.infra.mail.service;

import java.util.Map;

public interface SMTPService {
    void send(String subject, String to);
}
