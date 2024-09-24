package com.luckvicky.blur.domain.board.exception;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateBoardException extends BaseException {

    public FailToCreateBoardException() {
        super(FAIL_TO_CREATE_BOARD);
    }

}
