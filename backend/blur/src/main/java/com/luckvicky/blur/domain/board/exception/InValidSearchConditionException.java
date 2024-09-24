package com.luckvicky.blur.domain.board.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class InValidSearchConditionException extends BaseException {

    public InValidSearchConditionException() {
        super(ErrorCode.INVALID_SEARCH_CONDITION);
    }

}
