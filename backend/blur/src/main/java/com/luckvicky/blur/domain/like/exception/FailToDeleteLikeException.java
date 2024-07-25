package com.luckvicky.blur.domain.like.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class FailToDeleteLikeException extends BaseException {
    public FailToDeleteLikeException() {
        super(ErrorCode.FAIL_TO_DELETE_LIKE);
    }
}
