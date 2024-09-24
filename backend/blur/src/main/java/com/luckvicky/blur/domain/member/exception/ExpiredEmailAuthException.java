package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class ExpiredEmailAuthException extends BaseException {
    public ExpiredEmailAuthException() {
        super(ErrorCode.EXPIRED_EMAIL_CODE);
    }
}
