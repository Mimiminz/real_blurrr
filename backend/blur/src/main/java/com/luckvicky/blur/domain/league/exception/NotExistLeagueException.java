package com.luckvicky.blur.domain.league.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistLeagueException extends BaseException {

    public NotExistLeagueException(ErrorCode errorCode) {
        super(errorCode);
    }
}
