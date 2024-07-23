package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class UserNotFoundException extends BaseException {
    public UserNotFoundException() {
        super(ErrorCode.NOT_EXIST_MEMBER);
    }
}
