package com.luckvicky.blur.global.config;

import java.util.Properties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Slf4j
@Configuration
public class EmailConfig {
    // SMTP 서버
    @Value("${spring.mail.host}")
    private String host;

    // 계정
    @Value("${spring.mail.username}")
    private String username;

    // 비밀번호
    @Value("${spring.mail.password}")
    private String password;

    // 포트번호
    @Value("${spring.mail.port}")
    private int port;

    @Bean
    public JavaMailSender javaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(host);
        javaMailSender.setUsername(username);
        javaMailSender.setPassword(password);
        javaMailSender.setPort(port);
        javaMailSender.setDefaultEncoding("UTF-8");

        return javaMailSender;
    }
}
