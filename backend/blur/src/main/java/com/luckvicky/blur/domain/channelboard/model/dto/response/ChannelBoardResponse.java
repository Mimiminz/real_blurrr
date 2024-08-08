package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "채널 게시물 목록 응답")
public record ChannelBoardResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "제목")
        String title,

        @Schema(description = "본문 미리보기")
        String simpleContent,

        @Schema(description = "멘션된 리그 목록")
        List<MentionDto> mentionedLeagues,

        @Schema(description = "생성 시간")
        LocalDateTime createdAt,

        @Schema(description = "댓글 개수")
        Long commentCount,

        @Schema(description = "좋아요 개수")
        Long likeCount,

        @Schema(description = "조회수")
        Long viewCount

) {
    public static ChannelBoardResponse of(ChannelBoard channelBoard, List<MentionDto> mentionedLeagues) {
        return ChannelBoardResponse.builder()
                .id(channelBoard.getId())
                .member(SimpleMemberDto.of(channelBoard.getMember()))
                .title(channelBoard.getTitle())
                .simpleContent(channelBoard.getContent()
                        .replaceAll("<[^>]*>", "")
                        .replaceAll("\\s+", " ")
                        .trim()
                        .substring(0, Math.min(30, channelBoard.getContent().length()))
                        + (channelBoard.getContent().length() > 30 ? "..." : ""))
                .mentionedLeagues(mentionedLeagues)
                .createdAt(channelBoard.getCreatedAt())
                .commentCount(channelBoard.getCommentCount())
                .likeCount(channelBoard.getLikeCount())
                .viewCount(channelBoard.getViewCount())
                .build();
    }

}
