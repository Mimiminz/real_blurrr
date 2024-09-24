package com.luckvicky.blur.domain.board.model.entity;

import com.luckvicky.blur.domain.board.exception.InvalidBoardTypeException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardType {

    CHANNEL("채널"), LEAGUE("리그"), DASHCAM("블랙박스"), MYCAR("차자랑");

    private final String name;

    public static BoardType convertToEnum(String type) {

//        BoardType boardType;
//
//        try {
//            boardType = BoardType.valueOf(type);
//        } catch (IllegalArgumentException e) {
//            throw new InvalidBoardTypeException();
//        }

        return BoardType.valueOf(type.toUpperCase());

    }

}
