package com.luckvicky.blur.domain.comment.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistCommentException extends BaseException {

    public NotExistCommentException() {
        super(ErrorCode.NOT_EXIST_COMMENT);
    }

}
