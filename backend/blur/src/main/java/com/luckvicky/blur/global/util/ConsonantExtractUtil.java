package com.luckvicky.blur.global.util;

public class ConsonantExtractUtil {

    public static final String [] CHOSUNG = {
            "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
            "ㅅ","ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };

    public static String extract(String name) {

        StringBuilder result = new StringBuilder();

        for (String letter : name.split("")) {

            int codePoint = Character.codePointAt(letter, 0);

            if (codePoint >= 0xAC00) {
                result.append(CHOSUNG[(codePoint - 0xAC00) / 28 / 21]);
            } else {
                result.append(letter);
            }

        }

        return result.toString();

    }

}
