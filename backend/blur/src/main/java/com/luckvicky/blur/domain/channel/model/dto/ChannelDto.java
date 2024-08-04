package com.luckvicky.blur.domain.channel.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Schema(name = "채널 정보")
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

        @Schema(description = "채널 팔로우수")
        Long followCount;

        @Schema(description = "채널 태그")
        List<TagDto> tags;

        @Schema(description = "팔로우 여부 (null: 비 로그인)" )
        Boolean isFollowed;

}
