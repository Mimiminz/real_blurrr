package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@Schema(name = "채널 게시물 목록")
public class ChannelBoardListDto {

    @Schema(description = "게시물 정보")
    private BoardDto board;

    @Schema(description = "멘션된 리그 목록")
    private List<MentionDto> mentionedLeagues;

    public static ChannelBoardListDto of(BoardDto boardDto, List<MentionDto> mentionedLeagues){
        return ChannelBoardListDto.builder()
                .board(boardDto)
                .mentionedLeagues(mentionedLeagues)
                .build();
    }


}
