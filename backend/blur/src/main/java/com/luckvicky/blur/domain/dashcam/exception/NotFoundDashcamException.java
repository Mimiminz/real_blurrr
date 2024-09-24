package com.luckvicky.blur.domain.dashcam.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class NotFoundDashcamException extends BaseException {
    public NotFoundDashcamException() {
        super(ErrorCode.NOT_EXIST_DASHCAM);
    }
}
