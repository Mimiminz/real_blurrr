package com.luckvicky.blur.global.execption;

import com.luckvicky.blur.global.enums.code.ErrorCode;

public class UnauthorizedAccessException extends BaseException{

    public UnauthorizedAccessException() {
        super(ErrorCode.UNAUTHORIZED_ACCESS);
    }
}
