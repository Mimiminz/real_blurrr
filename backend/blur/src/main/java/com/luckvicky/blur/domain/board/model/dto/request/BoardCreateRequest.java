package com.luckvicky.blur.domain.board.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.annotation.custom.ValidEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(name = "게시글 생성 요청")
public class BoardCreateRequest {
    @Schema(
            description = "제목",
            example = "제목입니다.",
            maxLength = 35
    )
    String title;

    @Schema(
            description = "본문",
            example = "본문입니다."
    )
    String content;

    @Schema(
            description = "게시판 유형(CHANNEL | LEAGUE | DASHCAM | MYCAR)",
            example = "CHANNEL"
    )
    @ValidEnum(enumClass = BoardType.class, message = "유효하지 않은 게시글 타입 입니다.", ignoreCase = true)
    String boardType;


    public BoardCreateRequest(String title, String content, String boardType) {
        this.title = title;
        this.content = content;
        this.boardType = boardType;
    }

    public Board toEntity(Member member, BoardType type) {
        return Board.builder()
                .member(member)
                .title(this.title)
                .content(this.content)
                .type(type)
                .build();
    }

}
