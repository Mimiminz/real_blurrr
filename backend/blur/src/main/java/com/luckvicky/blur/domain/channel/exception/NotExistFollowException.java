package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistFollowException extends BaseException {
    public NotExistFollowException() {super(ErrorCode.NOT_EXIST_FOLLOW);}
}
