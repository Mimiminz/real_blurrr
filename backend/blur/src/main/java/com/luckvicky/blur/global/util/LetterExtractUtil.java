package com.luckvicky.blur.global.util;

public class LetterExtractUtil {

    public static final String [] CHOSUNG = {
            "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
            "ㅅ","ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    };

    public static final String [] JUNGSUNG = {"ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
            "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"};

    public static final String [] JONGSUNG = {"", "ㄱ", "ㄲ", "ᆪ", "ㄴ", "ᆬ", "ᆭ", "ㄷ",
            "ㄹ", "ᆰ", "ᆱ", "ᆲ", "ᆳ", "ᆴ", "ᆵ", "ᆶ", "ㅁ", "ㅂ", "ᆹ", "ᆺ", "ᆻ", "ᆼ",
            "ᆽ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};

    public static String extract(String name) {

        StringBuilder result = new StringBuilder();

        for (String letter : name.split("")) {

            int codePoint = Character.codePointAt(letter, 0);

            if (codePoint >= 0xAC00 && codePoint <= 0xD79D) {
                int startValue = codePoint - 0xAC00;
                int jong = startValue % 28;
                int jung = ((startValue - jong) / 28) % 21;
                int cho = (((startValue - jong) / 28) - jung) / 21;
                result.append(CHOSUNG[cho]).append(JUNGSUNG[jung]).append(JONGSUNG[jong]);
            } else {
                result.append(letter);
            }

        }

        return result.toString();

    }

}
