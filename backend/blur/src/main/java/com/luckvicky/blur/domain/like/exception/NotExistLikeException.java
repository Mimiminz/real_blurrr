package com.luckvicky.blur.domain.like.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistLikeException extends BaseException {

    public NotExistLikeException() {
        super(ErrorCode.NOT_EXIST_LIKE);
    }

}
