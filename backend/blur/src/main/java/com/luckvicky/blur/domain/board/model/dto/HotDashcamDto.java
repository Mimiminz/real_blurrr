package com.luckvicky.blur.domain.board.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "인기 블랙박스 게시물 정보")
public class HotDashcamDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "참여 인원")
    private Long voteCount;

    // todo: 선택지에 대한 정보 추가하기

}
