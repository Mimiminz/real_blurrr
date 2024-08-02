package com.luckvicky.blur.domain.channel.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistChannelException extends BaseException {

    public NotExistChannelException() {
        super(ErrorCode.NOT_EXIST_CHANNEL);
    }

}
