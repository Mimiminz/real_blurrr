package com.luckvicky.blur.domain.member.exception;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;

public class DuplicateNickName extends BaseException {
    public DuplicateNickName() {
        super(ErrorCode.DUPLICATE_NICKNAME);
    }
}
