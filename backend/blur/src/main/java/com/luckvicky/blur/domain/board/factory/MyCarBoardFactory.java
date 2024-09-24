package com.luckvicky.blur.domain.board.factory;


import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channelboard.model.dto.request.MyCarCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.entity.Member;

public class MyCarBoardFactory implements BoardFactory {
    private final BoardType boardType = BoardType.MYCAR;

    @Override
    public MyCarBoard createBoard(BoardCreateRequest data, Member member) {
        var myCarRequest = (MyCarCreateRequest) data;

        return MyCarBoard.builder()
                .thumbnail(myCarRequest.getThumbNail())
                .content(myCarRequest.getContent())
                .title(myCarRequest.getTitle())
                .type(this.boardType)
                .commentCount(0L)
                .viewCount(0L)
                .likeCount(0L)
                .member(member)
                .build();
    }
}
