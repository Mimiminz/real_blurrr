package com.luckvicky.blur.domain.member.factory;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

public interface AuthCodeFactory {
    default String saveAuthCode(String email) {
        String code = createCode();

        saveToRedis(generateKey(email), code);
        return code;
    }

    private String createCode() {
        int length = 6;
        try {
            String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            SecureRandom random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();

            for (int i = 0; i < length; i++) {
                int index = random.nextInt(characters.length());
                builder.append(characters.charAt(index));
            }

            return builder.toString();
        }  catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    void saveToRedis(String key, String code);
    String generateKey(String email);
}
