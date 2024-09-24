package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channel.model.dto.SimpleChannelDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "핫 게시글 목록 조회 응답")
public record HotBoardResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "채널 정보")
        SimpleChannelDto channel,

        @Schema(description = "제목")
        String title,

        @Schema(description = "좋아요 개수")
        Long likeCount,

        @Schema(description = "댓글 개수")
        Long commentCount

) {

    public static HotBoardResponse of(ChannelBoard board) {
        return HotBoardResponse.builder()
                .id(board.getId())
                .channel(SimpleChannelDto.of(board.getChannel()))
                .title(board.getTitle())
                .likeCount(board.getLikeCount())
                .commentCount(board.getCommentCount())
                .build();
    }

}
