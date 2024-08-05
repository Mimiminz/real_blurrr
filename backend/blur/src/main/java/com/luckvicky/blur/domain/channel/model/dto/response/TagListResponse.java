package com.luckvicky.blur.domain.channel.model.dto.response;

import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "태그 검색 목록 응답")
public record TagListResponse (

    @Schema(description = "조회한 태그 목록")
    List<TagDto> tags
)
{
    public static TagListResponse of (List<TagDto> tags) {
        return TagListResponse.builder()
                .tags(tags)
                .build();
    }
}
