package com.luckvicky.blur.domain.comment.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateCommentException extends BaseException {

    public FailToCreateCommentException(ErrorCode errorCode) {
        super(errorCode);
    }

}
