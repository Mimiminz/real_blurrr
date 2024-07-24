package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import lombok.Getter;

@Getter
public class NotExistMemberException extends BaseException {

    public NotExistMemberException() {
        super(ErrorCode.NOT_EXIST_MEMBER);
    }

}
