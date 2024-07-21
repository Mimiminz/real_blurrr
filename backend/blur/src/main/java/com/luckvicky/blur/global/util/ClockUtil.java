package com.luckvicky.blur.global.util;

import static com.luckvicky.blur.global.constant.StringFormat.TIMESTAMP_FORMAT;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ClockUtil {

    private static class ClockInstanceHolder {
        private static final Clock clock = Clock.systemDefaultZone();
    }

    public static LocalDateTime getLocalDateTime() {
        return LocalDateTime.now(ClockInstanceHolder.clock);
    }

    public static String getLocalDateTimeToString() {
        return LocalDateTime.now(ClockInstanceHolder.clock).format(DateTimeFormatter.ofPattern(TIMESTAMP_FORMAT));
    }

}
