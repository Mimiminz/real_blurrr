package com.luckvicky.blur.domain.board.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class InvalidBoardTypeException extends BaseException {

    public InvalidBoardTypeException(ErrorCode errorCode) {
        super(errorCode);
    }

}
