package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class PasswordMismatchException extends BaseException {
    public PasswordMismatchException() {
        super(ErrorCode.MISSMATCH_PASSWORD);
    }
}
