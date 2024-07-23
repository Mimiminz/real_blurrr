package com.luckvicky.blur.domain.board.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;

@Schema(name = "게시글 생성 요청")
public record BoardCreateDto(

        @Schema(
                description = "제목",
                example = "제목입니다.",
                maxLength = 20
        )
        String title,

        @Schema(
                description = "사용자 고유 식별값",
                example = "11ef4830-22b0-8bab-bdb9-5b68a61f28a6"
        )
        UUID memberId,

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

    public Board toEntity(Member member, BoardType type) {
        return Board.builder()
                .member(member)
                .title(this.title)
                .content(this.content)
                .type(type)
                .build();
    }

}
