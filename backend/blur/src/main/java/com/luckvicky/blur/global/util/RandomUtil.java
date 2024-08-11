package com.luckvicky.blur.global.util;

import java.util.Random;

public class RandomUtil {

    private static class RandomInstanceHolder {
        private static final Random random = new Random();
    }

    private RandomUtil() {
        RandomInstanceHolder.random.setSeed(System.currentTimeMillis());
    }

    public static int getRandomIndex(int end) {
        return RandomInstanceHolder.random.nextInt(end);
    }

}
