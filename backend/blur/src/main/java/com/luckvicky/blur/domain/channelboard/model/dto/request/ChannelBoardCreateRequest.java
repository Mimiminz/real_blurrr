package com.luckvicky.blur.domain.channelboard.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
@Schema(name = "채널 게시글 생성 요청")
public class ChannelBoardCreateRequest {

    @Schema(
            description = "제목",
            example = "GV70 구매 예정입니다.",
            maxLength = 35
    )
    String title;

    @Schema(
            description = "본문",
            example = "기대되네요~~~"
    )
    String content;

    @Schema(
            description = "멘션된 리그 이름 리스트 (최대 4개, 선택적)",
            example = "[\"현대\", \"쉐보레\", \"아반떼\"]"
    )
    @Size(max = 4, message = "멘션은 최대 4개까지만 가능합니다.")
    List<String> mentionedLeagueNames;

    public ChannelBoardCreateRequest() {
        mentionedLeagueNames = (mentionedLeagueNames != null) ? mentionedLeagueNames : new ArrayList<>();
    }

    public ChannelBoard toEntity(Channel channel, Member member) {
        return ChannelBoard.builder()
                .member(member)
                .channel(channel)
                .title(this.title)
                .content(this.content)
                .type(BoardType.CHANNEL)
                .viewCount(0L)
                .commentCount(0L)
                .likeCount(0L)
                .build();
    }

}

