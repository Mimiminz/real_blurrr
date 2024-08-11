package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.channel.model.dto.SimpleChannelDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Schema(name = "멘션 게시물 목록")
public record LeagueMentionListResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "채널 정보")
        SimpleChannelDto channel,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "제목")
        String title,

        @Schema(description = "조회수")
        Long viewCount,

        @Schema(description = "댓글 개수")
        Long commentCount,

        @Schema(description = "좋아요 개수")
        Long likeCount,

        @Schema(description = "생성 시간")
        LocalDateTime createdAt

) {
    public static LeagueMentionListResponse of(ChannelBoard board, Long viewCount) {
        return LeagueMentionListResponse.builder()
                .id(board.getId())
                .channel(SimpleChannelDto.of(board.getChannel()))
                .member(SimpleMemberDto.of(board.getMember()))
                .title(board.getTitle())
                .likeCount(board.getLikeCount())
                .commentCount(board.getCommentCount())
                .viewCount(viewCount)
                .createdAt(board.getCreatedAt())
                .build();
    }

}
