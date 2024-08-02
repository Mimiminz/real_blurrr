package com.luckvicky.blur.domain.alarm.factory.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Notification {
    private String message;
    private String title;
    private String link;
}
