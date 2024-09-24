package com.luckvicky.blur.domain.member.strategy;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public interface AuthCodeStrategy {
    default String saveAuthCode(String email) {
        String code = createCode();
        save(email, code);
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
    void save(String key, String code);

    boolean validAuthCode(String email, String code);
    void pushAvailableEmail(String email);
    void checkAvailableEmail(String email);
}
