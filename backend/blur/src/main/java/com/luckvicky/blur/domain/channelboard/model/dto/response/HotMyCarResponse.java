package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "인기 차자랑 게시글 목록 조회 응답")
public record HotMyCarResponse(
        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "대표 이미지")
        String thumbnail,

        @Schema(description = "조회수")
        Long viewCount
) {

    public static HotMyCarResponse of(MyCarBoard board) {
        return HotMyCarResponse.builder()
                .id(board.getId())
                .member(SimpleMemberDto.of(board.getMember()))
                .thumbnail(board.getThumbnail())
                .viewCount(board.getViewCount())
                .build();
    }

}
