package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "오늘의차 조회 응답")
public record TodayMyCarResponse(
        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "대표 이미지")
        String thumbnail,

        @Schema(description = "좋아요수")
        Long likeCount
) {

    public static TodayMyCarResponse of(MyCarBoard board) {
        return TodayMyCarResponse.builder()
                .id(board.getId())
                .member(SimpleMemberDto.of(board.getMember()))
                .thumbnail(board.getThumbnail())
                .likeCount(board.getLikeCount())
                .build();
    }

}
