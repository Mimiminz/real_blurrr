//package com.luckvicky.blur.global.config;
//
//import com.fasterxml.jackson.core.SerializableString;
//import com.fasterxml.jackson.core.io.CharacterEscapes;
//import com.fasterxml.jackson.core.io.SerializedString;
//import org.apache.commons.lang3.StringEscapeUtils;
//
//public class XssProtectSupport extends CharacterEscapes {
//    private final int[] asciiEscapes;
//    private static final char ZERO_WIDTH_JOINER = 0x200D;
//
//
//
//    public XssProtectSupport() {
//        asciiEscapes = CharacterEscapes.standardAsciiEscapesForJSON();
//        asciiEscapes['<'] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes['>'] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes['\"'] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes['('] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes[')'] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes['#'] = CharacterEscapes.ESCAPE_CUSTOM;
//        asciiEscapes['\''] = CharacterEscapes.ESCAPE_CUSTOM;
//    }
//
//    @Override
//    public int[] getEscapeCodesForAscii() {
//        return asciiEscapes;
//    }
//
//    @Override
//    public SerializableString getEscapeSequence(int ch) {
//        char charAt = (char)ch;
//        if (Character.isHighSurrogate(charAt) || Character.isLowSurrogate(charAt) || charAt == ZERO_WIDTH_JOINER) {
//            StringBuilder sb = new StringBuilder();
//            sb.append("\\u");
//            sb.append(String.format("%04x", ch));
//            return new SerializedString(sb.toString());
//        } else {
//            return new SerializedString(StringEscapeUtils.escapeHtml4(Character.toString(charAt)));
//        }
//    }
//
//
//}
//
//
