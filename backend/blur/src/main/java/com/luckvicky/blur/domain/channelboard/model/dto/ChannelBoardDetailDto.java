package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@Schema(name = "채널 게시글")
public class ChannelBoardDetailDto {

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
    private Long likeCount;

    @Schema(description = "게시물 생성 시간")
    private LocalDateTime createdAt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Schema(description = "멘션된 리그 목록")
    private List<MentionDto> mentionedLeagues;

    @Schema(description = "좋아요 여부")
    private boolean isLiked;


    public static ChannelBoardDetailDto of(ChannelBoard channelBoard, Long viewCount, List<MentionDto> mentionedLeagues, boolean isLiked){
        return ChannelBoardDetailDto.builder()
                .id(channelBoard.getId())
                .member(SimpleMemberDto.of(channelBoard.getMember()))
                .title(channelBoard.getTitle())
                .viewCount(viewCount)
                .commentCount(channelBoard.getCommentCount())
                .likeCount(channelBoard.getLikeCount())
                .createdAt(channelBoard.getCreatedAt())
                .content(channelBoard.getContent())
                .mentionedLeagues(mentionedLeagues)
                .isLiked(isLiked)
                .build();
    }

}
