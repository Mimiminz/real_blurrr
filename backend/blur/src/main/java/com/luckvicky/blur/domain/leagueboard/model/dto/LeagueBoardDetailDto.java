package com.luckvicky.blur.domain.leagueboard.model.dto;

import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "리그 게시물 상세 정보")
public class LeagueBoardDetailDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "본문")
    private String content;

    @Schema(description = "생성 시간")
    private String createdAt;

    @Schema(description = "조회수")
    private Long viewCount;

}
