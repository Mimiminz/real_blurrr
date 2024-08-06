package com.luckvicky.blur.domain.mycar.model.resp;

import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record SimpleMyCar(
        @Schema
        String thumbNail,
        long viewCnt,
        SimpleMemberDto simpleMemberDto
) {
    public static SimpleMyCar of(MyCarBoard myCarBoard) {
        return SimpleMyCar.builder()
                .thumbNail(myCarBoard.getThumbnail())
                .simpleMemberDto(SimpleMemberDto.of(myCarBoard.getMember()))
                .viewCnt(myCarBoard.getViewCount())
                .build();
    }
}
