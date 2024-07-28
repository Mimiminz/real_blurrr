package com.luckvicky.blur.infra.mail.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AmazonSMTPService implements SMTPService {
    private final AmazonSimpleEmailService amazonSimpleEmailService;

    @Value("${aws.ses.from}")
    private String from;

    public AmazonSMTPService(AmazonSimpleEmailService amazonSimpleEmailService) {
        this.amazonSimpleEmailService = amazonSimpleEmailService;
    }


    @Async
    @Override
    public void send(String subject, String to) {
        String content = "test";

        SendEmailRequest sendEmailRequest = createSendEmailRequest(subject, content, to);

        try {
            amazonSimpleEmailService.sendEmail(sendEmailRequest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private SendEmailRequest createSendEmailRequest(String subject, String content, String to) {
        return new SendEmailRequest()
                .withDestination(new Destination().withToAddresses(from))
                .withSource(to)
                .withMessage(new Message()
                        .withSubject(new Content().withCharset(StandardCharsets.UTF_8.name()).withData(subject))
                        .withBody(new Body()
                                .withText(new Content().withCharset(StandardCharsets.UTF_8.name()).withData(content))));

    }
}
