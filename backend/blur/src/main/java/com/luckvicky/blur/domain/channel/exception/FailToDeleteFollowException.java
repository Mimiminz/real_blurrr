package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToDeleteFollowException extends BaseException {
    public FailToDeleteFollowException() {
        super(ErrorCode.FAIL_TO_DELETE_FOLLOW);
    }

}
