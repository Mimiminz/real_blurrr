package com.luckvicky.blur.domain.leaguemember.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotAllocatedLeagueException extends BaseException {

    public NotAllocatedLeagueException() {
        super(ErrorCode.NOT_ALLOCATED_LEAGUE);
    }

}
