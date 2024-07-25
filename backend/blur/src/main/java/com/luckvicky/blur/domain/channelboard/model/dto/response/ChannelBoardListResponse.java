package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(name = "채널 게시물 목록 응답")
public record ChannelBoardListResponse (
    @Schema(description = "채널 게시물 목록")
    List<ChannelBoardListDto> boards
){
    public static ChannelBoardListResponse of(List<ChannelBoardListDto> boards){
        return ChannelBoardListResponse.builder()
                .boards(boards)
                .build();
    }

}
