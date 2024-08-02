package com.luckvicky.blur.global.config;

import com.luckvicky.blur.domain.alarm.factory.CommentNotificationFactory;
import com.luckvicky.blur.domain.alarm.factory.NotificationFactory;
import com.luckvicky.blur.domain.alarm.factory.notification.CommentNotification;
import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Slf4j
@Configuration
public class NotificationConfig {

    @Bean
    public Map<String, NotificationFactory> factoryMap() {
        log.info("=======================================");
        Map<String, NotificationFactory> factoryMap = new HashMap<>();
        factoryMap.put(AlarmType.ADD_COMMENT.getType(), commentNotificationFactory());
        return factoryMap;
    }

    private CommentNotificationFactory commentNotificationFactory() {
        return new CommentNotificationFactory();
    }
}
