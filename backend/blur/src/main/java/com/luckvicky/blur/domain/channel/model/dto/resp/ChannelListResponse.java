package com.luckvicky.blur.domain.channel.model.dto.resp;

import com.luckvicky.blur.domain.channel.model.dto.req.ChannelDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "전체 채널 조회 응답")
public record ChannelListResponse(
    @Schema(description = "조회한 채널 목록")
    Iterable<ChannelDto> channels
) {
    public static ChannelListResponse of(Iterable<ChannelDto> channels) {
        return ChannelListResponse.builder()
                .channels(channels)
                .build();
    }

}
