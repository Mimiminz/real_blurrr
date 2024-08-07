package com.luckvicky.blur.domain.channel.model.dto;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(name = "간단한 채널 정보")
public class SimpleChannelDto {

        @Schema(description = "채널 고유 식별값")
        UUID id;

        @Schema(description = "채널 이름")
        String name;

        @Schema(description = "채널 이미지 URL")
        String imgUrl;

        public static SimpleChannelDto of(Channel channel) {
                return SimpleChannelDto.builder()
                        .id(channel.getId())
                        .name(channel.getName())
                        .imgUrl(channel.getImgUrl())
                        .build();
        }

}
