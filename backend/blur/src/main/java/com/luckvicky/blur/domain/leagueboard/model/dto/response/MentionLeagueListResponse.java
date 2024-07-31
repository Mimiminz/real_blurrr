package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "멘션 리그 목록 조회 응답")
public record MentionLeagueListResponse(
        @Schema(description = "멘션된 채널 게시물 목록")
        List<ChannelBoardDto> channelBoards
) {

    public static MentionLeagueListResponse of(List<ChannelBoardDto> channelBoards) {
        return MentionLeagueListResponse.builder()
                .channelBoards(channelBoards)
                .build();
    }

}
