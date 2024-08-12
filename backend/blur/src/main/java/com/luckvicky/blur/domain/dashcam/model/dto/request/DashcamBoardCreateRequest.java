package com.luckvicky.blur.domain.dashcam.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.model.entity.Video;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.vote.model.dto.request.OptionCreateRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Schema(name = "블랙박스 게시글 생성 요청 ")
public record DashcamBoardCreateRequest(

        @Schema(
                description = "제목",
                example = "사고 영상 공유합니다.",
                maxLength = 20
        )
        @Size(max = 20)
        String title,

        @Schema(
                description = "본문",
                example = "저는 잘못한게 없는데.."
        )
        String content,

        @Schema(
                description = "투표 제목",
                example = "누가 더 잘못했을까요?"
        )
        String voteTitle,

        @Schema(
                description = "옵션 리스트 (최대 4개, 선택적)",
                example = "[{\"optionOrder\": 1, \"content\": \"아반떼가 잘못했다.\"}, {\"optionOrder\": 2, \"content\": \"모닝이 잘못했다.\"}]"
        )
        @Size(max = 4, message = "옵션은 최대 4개까지만 가능합니다.")
        @Valid
        List<OptionCreateRequest> options,

        @Schema(
                description = "비디오 URL 리스트 (최대 2개, 선택적)",
                example = "[{\"videoOrder\": 1, \"videoUrl\": \"http://example.com/video1.mp4\"}, {\"videoOrder\": 2, \"videoUrl\": \"http://example.com/video2.mp4\"}]"
        )

        @Size(max = 2, message = "비디오 URL은 최대 2개까지만 가능합니다.")
        @Valid
        List<VideoCreateRequest> videos,

        @Schema(
                description = "멘션된 리그 이름 리스트 (최대 4개, 선택적)",
                example = "[\"현대\", \"쉐보레\", \"아반떼\"]"
        )
        @Size(max = 4, message = "멘션은 최대 4개까지만 가능합니다.")
        List<String> mentionedLeagueNames

) {

    public DashcamBoardCreateRequest {
        options = (options != null) ? options : new ArrayList<>();
        videos = (videos != null) ? videos : new ArrayList<>();
        mentionedLeagueNames = (mentionedLeagueNames != null) ? mentionedLeagueNames : new ArrayList<>();
    }

    public DashCam toEntity(Channel channel, Member member) {
        return DashCam.builder()
                .channel(channel)
                .member(member)
                .title(this.title)
                .content(this.content)
                .voteTitle(this.voteTitle)
                .type(BoardType.DASHCAM)
                .viewCount(0L)
                .commentCount(0L)
                .likeCount(0L)
                .totalVoteCount(0L)
                .thumbnail("https://blurrr-img-bucket.s3.ap-northeast-2.amazonaws.com/default/logo.png")
                .build();
    }

}