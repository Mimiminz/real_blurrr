package com.luckvicky.blur.domain.like.factory;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.like.model.entity.Like;
import com.luckvicky.blur.domain.member.model.entity.Member;

public class LikeFactory {

    public static Like createLike(Member member, Board board) {

        Like like = Like.builder()
                .member(member)
                .board(board)
                .build();

        return like;

    }

}
