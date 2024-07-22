package com.luckvicky.blur.domain.board.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.global.util.UuidUtil;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "게시글 생성 요청")
public record CreateBoardRequest(

        @Schema(
                description = "제목",
                example = "제목입니다.",
                maxLength = 20
        )
        String title,

        @Schema(
                description = "작성자 고유 식별값",
                example = "123213"
        )
        String memberId,

        @Schema(
                description = "본문",
                example = "본문입니다."
        )
        String content,

        @Schema(
                description = "게시판 유형(CHANNEL | LEAGUE | DASHCAM)",
                example = "CHANNEL"
        )
        String boardType

) {

    // todo: 인자에 멤버 추가
    public Board toEntity(BoardType type) {
        return Board.builder()
                .id(UuidUtil.createSequentialUUID())
                .title(this.title)
                .content(this.content)
                .type(type)
                .build();
    }

}
