package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamMentionDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "채널 게시물 목록 DTO")
public class ChannelBoardListDto {

    @Schema(description = "게시물 정보")
    private BoardDto board;

    @Schema(description = "멘션된 리그 목록")
    private List<ChannelBoardMentionDto> mentionedLeagues;

    public static ChannelBoardListDto of(BoardDto boardDto, List<ChannelBoardMentionDto> mentionedLeagues){
        return ChannelBoardListDto.builder()
                .board(boardDto)
                .mentionedLeagues(mentionedLeagues)
                .build();
    }


}
