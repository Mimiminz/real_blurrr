package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class InvalidEmailVerificationException extends BaseException {
    public InvalidEmailVerificationException() {
        super(ErrorCode.INVALID_EMAIL_VERIFIED);
    }
}
