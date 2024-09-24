package com.luckvicky.blur.domain.dashcam.model.dto;

import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "블랙박스 게시물 목록")
public class DashcamBoardListDto{

    @Schema(description = "게시물 고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "게시물 제목")
    private String title;

    @Schema(description = "게시물 조회수")
    private Long viewCount;

    @Schema(description = "댓글 개수")
    private Long commentCount;

    @Schema(description = "좋아요 개수")
    private Long  likeCount;

    @Schema(description = "게시물 생성 시간")
    private LocalDateTime createdAt;

    @Schema(description = "썸네일 url")
    private String thumbNail;

    @Schema(description = "멘션된 리그 목록")
    private List<MentionDto> mentionedLeagues;

}
