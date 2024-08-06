package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class KeywordLimitExceededException extends BaseException {

    public KeywordLimitExceededException() {
        super(ErrorCode.KEYWORD_LIMIT_EXCEEDED);
    }
}
