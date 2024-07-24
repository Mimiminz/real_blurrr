package com.luckvicky.blur.domain.channel.model.dto;

import com.luckvicky.blur.domain.channel.model.entity.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "태그 DTO")
public class TagDto {
    @Schema(description = "태그 고유 식별값")
    UUID id;

    @Schema(description = "태그 이름")
    String name;


    public static TagDto from(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

}
