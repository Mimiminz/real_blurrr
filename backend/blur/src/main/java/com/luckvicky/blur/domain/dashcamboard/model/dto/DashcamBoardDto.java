package com.luckvicky.blur.domain.dashcamboard.model.dto;

import com.luckvicky.blur.domain.dashcamboard.model.entity.Option;
import com.luckvicky.blur.domain.member.model.MemberDto;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "블랙박스 게시글 DTO")
public class DashcamBoardDto {
    @Schema(description = "게시물 고유 식별값")
    private UUID id;

    @Schema(description = "게시물 제목")
    private String title;

    @Schema(description = "사용자 정보")
    private MemberDto member;

    @Schema(description = "게시물 생성 시간")
    private LocalDateTime createdAt;

    @Schema(description = "블랙박스 영상 url")
    private List<String> videoUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Schema(description = "게시물 투표 목록")
    private List<Option> options;

    @Schema(description = "게시물 조회수")
    private Long viewCount;

    // :todo 채널 멘션 목록

    // : todo 좋아요 수



}
