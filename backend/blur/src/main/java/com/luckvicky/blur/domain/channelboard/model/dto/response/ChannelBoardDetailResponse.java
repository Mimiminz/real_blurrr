package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "채널 게시물 상세 응답")
public record ChannelBoardDetailResponse (
    @Schema(description = "채널 상세 조회")
    ChannelBoardDetailDto channelBoard
){
    public static ChannelBoardDetailResponse of(ChannelBoardDetailDto channelBoardDetailDto){
        return new ChannelBoardDetailResponse(channelBoardDetailDto);
    }
}
