package com.luckvicky.blur.domain.vote.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class AlreadyVotedException extends BaseException {
    public AlreadyVotedException() {
        super(ErrorCode.ALREADY_VOTED);
    }
}