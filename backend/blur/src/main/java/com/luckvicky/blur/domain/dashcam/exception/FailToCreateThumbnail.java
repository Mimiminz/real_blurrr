package com.luckvicky.blur.domain.dashcam.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class FailToCreateThumbnail extends BaseException {

    public FailToCreateThumbnail() {
        super(ErrorCode.FAIL_TO_CREATE_THUMBNAIL);
    }
}
