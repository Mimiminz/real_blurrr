package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "인기 차자랑 게시물 정보")
public class MyCarDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "대표 이미지")
    private String thumbnail;

    @Schema(description = "조회수")
    private Long viewCount;

}
