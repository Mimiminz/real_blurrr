package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class TagLimitExceededException extends BaseException {

    public TagLimitExceededException(){
        super(ErrorCode.TAG_LIMIT_EXCEEDED);
    }
}
