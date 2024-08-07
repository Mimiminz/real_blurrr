package com.luckvicky.blur.domain.mycar.model.resp;

import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
public record MyCarSimple(
        UUID id,
        @Schema
        String thumbNail,
        long viewCnt,
        SimpleMemberDto simpleMemberDto
) {
    public static MyCarSimple of(MyCarBoard myCarBoard) {
        return MyCarSimple.builder()
                .id(myCarBoard.getId())
                .thumbNail(myCarBoard.getThumbnail())
                .simpleMemberDto(SimpleMemberDto.of(myCarBoard.getMember()))
                .viewCnt(myCarBoard.getViewCount())
                .build();
    }
}
