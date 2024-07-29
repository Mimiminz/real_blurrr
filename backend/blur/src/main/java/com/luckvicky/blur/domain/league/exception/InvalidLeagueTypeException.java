package com.luckvicky.blur.domain.league.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class InvalidLeagueTypeException extends BaseException {

    public InvalidLeagueTypeException() {
        super(ErrorCode.INVALID_LEAGUE_TYPE);
    }

}
