package com.luckvicky.blur.domain.dashcamboard.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class DashcamNotFoundException extends BaseException {
    public DashcamNotFoundException() {
        super(ErrorCode.NOT_EXIST_DASHCAM);
    }
}
