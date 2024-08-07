package com.luckvicky.blur.domain.channel.model.dto.response;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.global.model.dto.SliceResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(name = "전체 채널 조회 응답")
public record ChannelListResponse(
    @Schema(description = "조회한 채널 목록")
    List<ChannelDto> channels
)
{
    public static ChannelListResponse of(List<ChannelDto> channels) {
        return ChannelListResponse.builder()
                .channels(channels)
                .build();
    }

}
