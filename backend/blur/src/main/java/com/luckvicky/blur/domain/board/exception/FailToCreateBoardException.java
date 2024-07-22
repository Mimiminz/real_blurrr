package com.luckvicky.blur.domain.board.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateBoardException extends BaseException {

    public FailToCreateBoardException(ErrorCode errorCode) {
        super(errorCode);
    }

}
