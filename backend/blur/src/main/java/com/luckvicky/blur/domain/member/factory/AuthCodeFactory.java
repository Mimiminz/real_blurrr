package com.luckvicky.blur.domain.member.factory;

public interface AuthCodeFactory {
    default String saveAuthCode(String email) {
        String code = creatAuthCode();

        saveCode(generateKey(email), code);
        return code;
    }

    String creatAuthCode();
    void saveCode(String key, String code);
    String generateKey(String email);
}
