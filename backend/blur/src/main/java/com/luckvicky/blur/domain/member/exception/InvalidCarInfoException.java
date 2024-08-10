package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class InvalidCarInfoException extends BaseException {
    public InvalidCarInfoException(ErrorCode errorCode) {
        super(errorCode);
    }
}
