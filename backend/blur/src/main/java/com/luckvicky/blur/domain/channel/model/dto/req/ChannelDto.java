package com.luckvicky.blur.domain.channel.model.dto.req;

import com.luckvicky.blur.domain.channel.model.entity.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "채널 DTO")
public class ChannelDto {
        @Schema(description = "채널 고유 식별값")
        UUID id;

        @Schema(description = "채널 이름")
        String name;

        @Schema(description = "채널 이미지 URL")
        String imgUrl;

        @Schema(description = "채널 설명")
        String info;

        @Schema(description = "채널 소유자")
        String owner;

        @Schema(description = "채널 태그")
        List<TagDto> tags;



}
