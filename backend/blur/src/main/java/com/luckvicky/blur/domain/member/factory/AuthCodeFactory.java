package com.luckvicky.blur.domain.member.factory;

import com.luckvicky.blur.global.util.UuidUtil;

public interface AuthCodeFactory {
    default Boolean saveAuthCode(String email) {
        String code = creatAuthCode();

        saveCode(generateKey(email), code);
        return true;
    }

    String creatAuthCode();
    void saveCode(String key, String code);
    String generateKey(String email);
}
