package com.luckvicky.blur.domain.leaguemember.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotHasAuthorityOfLeagueException extends BaseException {

    public NotHasAuthorityOfLeagueException() {
        super(ErrorCode.NOT_HAS_AUTHORITY_OF_LEAGUE);
    }

}
