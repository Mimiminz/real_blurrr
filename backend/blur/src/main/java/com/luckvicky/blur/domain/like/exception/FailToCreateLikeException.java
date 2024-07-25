package com.luckvicky.blur.domain.like.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateLikeException extends BaseException {

    public FailToCreateLikeException() {
        super(ErrorCode.FAIL_TO_CREATE_LIKE);
    }

}
