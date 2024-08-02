package com.luckvicky.blur.domain.channel.model.dto.response;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "특정 채널 조회 응답")
public record ChannelResponse(
        @Schema(description = "조회한 채널 정보")
        ChannelDto channel
) {
    public static ChannelResponse of(ChannelDto channel) {
        return ChannelResponse.builder()
                .channel(channel)
                .build();
    }
}
