package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(name = "채널 게시물 목록 응답")
public record ChannelBoardListResponse (
    @Schema(description = "게시물 목록")
    List<BoardDto> boards
){
    public static ChannelBoardListResponse of(List<BoardDto> boards){
        ChannelBoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
