package com.luckvicky.blur.domain.board.model.dto;

import com.luckvicky.blur.domain.channel.model.dto.SimpleChannelDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "핫 게시물 정보")
public class HotBoardDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "채널 정보")
    private SimpleChannelDto channel;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "좋아요 개수")
    private Long  likeCount;

    @Schema(description = "댓글 개수")
    private Long commentCount;

}
