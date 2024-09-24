package com.luckvicky.blur.domain.mycar.model.resp;

import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.Builder;

@Builder
public record MyCarSimple(
        UUID id,
        @Schema(description = "대표 이미지")
        String thumbNail,
        long likeCnt,
        long commentCnt,
        long viewCnt,
        SimpleMemberDto simpleMemberDto
) {
    public static MyCarSimple of(MyCarBoard myCarBoard) {
        return MyCarSimple.builder()
                .id(myCarBoard.getId())
                .thumbNail(myCarBoard.getThumbnail())
                .likeCnt(myCarBoard.getLikeCount())
                .commentCnt(myCarBoard.getCommentCount())
                .viewCnt(myCarBoard.getViewCount())
                .simpleMemberDto(SimpleMemberDto.of(myCarBoard.getMember()))
                .build();
    }
}
