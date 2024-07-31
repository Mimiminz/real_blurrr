package com.luckvicky.blur.domain.channelboard.model.dto;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.SimpleChannelDto;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "채널 게시물 목록")
public class ChannelBoardDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "채널 정보")
    private SimpleChannelDto channel;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "생성 시간")
    private String createdAt;

    @Schema(description = "댓글 개수")
    private Long commentCount;

    @Schema(description = "좋아요 개수")
    private Long likeCount;

    public static ChannelBoardDto of(
            UUID id, SimpleChannelDto channel, SimpleMemberDto member, String title, String createdAt, Long commentCount, Long likeCount
    ) {
        return ChannelBoardDto.builder()
                .id(id)
                .channel(channel)
                .member(member)
                .title(title)
                .createdAt(createdAt)
                .commentCount(commentCount)
                .likeCount(likeCount)
                .build();
    }

}
