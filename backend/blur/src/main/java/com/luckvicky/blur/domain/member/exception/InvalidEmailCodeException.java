package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class InvalidEmailCodeException extends BaseException {
    public InvalidEmailCodeException() {
        super(ErrorCode.INVALID_EMAIL_CODE);
    }
}
