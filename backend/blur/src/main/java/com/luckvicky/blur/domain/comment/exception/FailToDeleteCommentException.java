package com.luckvicky.blur.domain.comment.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class FailToDeleteCommentException extends BaseException {

    public FailToDeleteCommentException() {
        super(ErrorCode.FAIL_TO_DELETE_COMMENT);
    }
}
