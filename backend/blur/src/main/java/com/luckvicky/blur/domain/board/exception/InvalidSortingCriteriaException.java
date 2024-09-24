package com.luckvicky.blur.domain.board.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class InvalidSortingCriteriaException extends BaseException {

    public InvalidSortingCriteriaException() {
        super(ErrorCode.INVALID_SORTING_CRITERIA);
    }

}
