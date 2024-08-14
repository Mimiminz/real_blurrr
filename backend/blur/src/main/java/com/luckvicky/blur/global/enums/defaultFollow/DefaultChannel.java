package com.luckvicky.blur.global.enums.defaultFollow;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DefaultChannel {
    MYCAR("차자랑"), DASHCAM("블랙박스");

    private final String name;

    public static DefaultChannel convertToEnum(final String name) {
        return DefaultChannel.valueOf(name.toUpperCase());
    }


}
