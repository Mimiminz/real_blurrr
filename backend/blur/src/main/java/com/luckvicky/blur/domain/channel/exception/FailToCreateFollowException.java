package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateFollowException extends BaseException {

    public FailToCreateFollowException() {
        super(ErrorCode.FAIL_TO_CREATE_FOLLOW);
    }
}
