package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "인기 블랙박스 게시물 정보")
public record HotDashCamResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "제목")
        String title,

        @Schema(description = "참여 인원")
        Long voteCount

) {

        public static HotDashCamResponse of(DashCam dashCam) {
                return HotDashCamResponse.builder()
                        .id(dashCam.getId())
                        .title(dashCam.getTitle())
                        .voteCount(dashCam.getTotalVoteCount())
                        .build();
        }

}
