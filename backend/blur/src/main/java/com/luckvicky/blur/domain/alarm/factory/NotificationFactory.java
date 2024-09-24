package com.luckvicky.blur.domain.alarm.factory;

import com.luckvicky.blur.domain.alarm.factory.notification.Notification;

public interface NotificationFactory {
    Notification createNotification(String... args);
}
