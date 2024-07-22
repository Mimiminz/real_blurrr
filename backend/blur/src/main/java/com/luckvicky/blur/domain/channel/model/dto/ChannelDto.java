package com.luckvicky.blur.domain.channel.model.dto;

import com.luckvicky.blur.domain.channel.model.entity.Tags;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.UUID;

@Getter
@Schema(name = "채널 DTO")
public class ChannelDto {
        @Schema(description = "채널 고유 식별값")
        String id;

        @Schema(description = "채널 이름")
        String name;

        @Schema(description = "채널 이미지 URL")
        String imgUrl;

        @Schema(description = "채널 정보")
        String info;

        @Schema(description = "채널 소유자")
        String owner;

}
