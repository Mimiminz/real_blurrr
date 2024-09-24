package com.luckvicky.blur.domain.channelboard.model.dto.response;

import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.vote.model.dto.OptionDto;
import com.luckvicky.blur.domain.vote.model.entity.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
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
        Long voteCount,

        @Schema(description = "투표 항목 개수")
        Integer optionCount,

        @Schema(description = "투표 항목 정보")
        List<OptionDto> options

) {

        public static HotDashCamResponse of(DashCam dashCam) {
                return HotDashCamResponse.builder()
                        .id(dashCam.getId())
                        .title(dashCam.getTitle())
                        .voteCount(dashCam.getTotalVoteCount())
                        .optionCount(dashCam.getOptions().size())
                        .options(OptionDto.of(dashCam.getOptions()))
                        .build();
        }

}
