package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "채널 게시물 목록 멘션 DTO")
public class MentionDto {

    @Schema(description = "멘션된 리그 이름")
    private String name;

    public static MentionDto of(Mention mention){
        return MentionDto.builder()
                .name(mention.getLeague().getName())
                .build();
    }

    public static List<MentionDto> of(List<Mention> mentions) {
        return mentions.stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());
    }

}
