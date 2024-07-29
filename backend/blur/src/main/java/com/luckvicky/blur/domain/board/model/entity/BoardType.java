package com.luckvicky.blur.domain.board.model.entity;

import com.luckvicky.blur.domain.board.exception.InvalidBoardTypeException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardType {

    CHANNEL, LEAGUE, DASHCAM;

    public static BoardType convertToEnum(String type) {

        BoardType boardType;

        try {
            boardType = BoardType.valueOf(type);
        } catch (IllegalArgumentException e) {
            throw new InvalidBoardTypeException();
        }

        return boardType;

    }

}
