package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "인기 차자랑 게시글 목록 조회 응답")
public record HotMyCarListResponse(
        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "대표 이미지")
        String thumbnail,

        @Schema(description = "조회수")
        Long viewCount
) {

    public static HotMyCarListResponse of(ChannelBoard board) {
        return HotMyCarListResponse.builder()
                .id(board.getId())
                .member(SimpleMemberDto.of(board.getMember()))
//                 :todo 썸네일 사진 추후에 추가 필요
//                .thumbnail(myCarBoard.getThumbnail())
                .viewCount(board.getViewCount())
                .build();
    }

}
