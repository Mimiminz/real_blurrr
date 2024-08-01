package com.luckvicky.blur.domain.alarm.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class NotExistAlarmException extends BaseException {
    public NotExistAlarmException() {
        super(ErrorCode.NOT_EXIST_ALARM);
    }
}
