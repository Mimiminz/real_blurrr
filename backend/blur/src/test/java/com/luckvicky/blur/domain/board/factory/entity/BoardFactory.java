package com.luckvicky.blur.domain.board.factory.entity;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.UuidUtil;
import org.springframework.test.util.ReflectionTestUtils;

public class BoardFactory {

    public static final String TITLE = "title";
    public static final String CONTENT = "content";

    public static LeagueBoard createLeagueBoard() {

        LeagueBoard board = LeagueBoard.builder()
                .title(TITLE)
                .content(CONTENT)
                .type(BoardType.LEAGUE)
                .likeCount(100L)
                .viewCount(10L)
                .commentCount(10L)
                .status(ActivateStatus.ACTIVE)
                .build();

        ReflectionTestUtils.setField(board, "id", UuidUtil.createSequentialUUID());

        return board;

    }

}
