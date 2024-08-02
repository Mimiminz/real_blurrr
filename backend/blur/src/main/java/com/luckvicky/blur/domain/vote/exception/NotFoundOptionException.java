package com.luckvicky.blur.domain.vote.exception;

import com.luckvicky.blur.global.execption.BaseException;
import com.luckvicky.blur.global.enums.code.ErrorCode;


public class NotFoundOptionException extends BaseException {
    public NotFoundOptionException(){
        super(ErrorCode.NOT_EXIST_OPTION);
    }
}
