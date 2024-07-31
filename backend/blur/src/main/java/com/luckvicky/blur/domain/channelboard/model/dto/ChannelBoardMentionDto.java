package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoardMention;
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
public class ChannelBoardMentionDto {

    @Schema(description = "멘션된 리그 이름")
    private String name;

    public static ChannelBoardMentionDto of(ChannelBoardMention channelBoardMention){
        return ChannelBoardMentionDto.builder()
                .name(channelBoardMention.getLeague().getName())
                .build();
    }

    public static List<ChannelBoardMentionDto> of(List<ChannelBoardMention> mentions) {
        return mentions.stream()
                .map(ChannelBoardMentionDto::of)
                .collect(Collectors.toList());
    }
}
