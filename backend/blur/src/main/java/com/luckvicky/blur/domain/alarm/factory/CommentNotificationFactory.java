package com.luckvicky.blur.domain.alarm.factory;

import com.luckvicky.blur.domain.alarm.factory.notification.CommentNotification;
import com.luckvicky.blur.domain.alarm.factory.notification.Notification;

public class CommentNotificationFactory implements NotificationFactory {
    @Override
    public Notification createNotification(String... args) {
        if (args.length != 1) {
            throw new IllegalArgumentException("CommentNotification requires 1 argument: postTitle");
        }
        return new CommentNotification(args[0]);
    }
}
