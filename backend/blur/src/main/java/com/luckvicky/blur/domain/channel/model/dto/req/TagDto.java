package com.luckvicky.blur.domain.channel.model.dto.req;

import com.luckvicky.blur.domain.channel.model.entity.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(name = "태그 DTO")
public class TagDto {
    @Schema(description = "태그 고유 식별값")
    String id;

    @Schema(description = "태그 이름")
    String name;


    public TagDto(String id, String name) {
        this.id = id;
        this.name = name;
    }


    public static TagDto from(Tag tag) {
        return TagDto.builder()
                .id(tag.getId().toString())
                .name(tag.getName())
                .build();
    }

}
