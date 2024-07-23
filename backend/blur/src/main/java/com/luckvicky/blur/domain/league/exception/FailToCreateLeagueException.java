package com.luckvicky.blur.domain.league.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class FailToCreateLeagueException extends BaseException {

    public FailToCreateLeagueException(ErrorCode errorCode) {
        super(errorCode);
    }

}
