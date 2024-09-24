package com.luckvicky.blur.domain.channel.model.dto.request;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

@Schema(name = "채널 생성 요청")
public record ChannelCreateRequest (

    @Schema(description = "채널 이름", example = "채널 이름입니다.")
    String name,

    @Schema(description = "이미지 URL")
    String imgUrl,

    @Schema(description = "채널 설명", example = "채널 설명입니다.")
    String info,

    @Schema(description = "태그 목록", example = "[\"SUV\",\"정보공유\"]"
    )
    @NotEmpty(message = "태그는 최소 1개 이상 필요합니다.")
    @Size(max = 3, message = "태그는 최대 3개까지만 가능합니다.")
    List<String> tags
){

    public Channel toEntity(Member member) {
        return Channel.builder()
                .name(this.name)
                .imgUrl(this.imgUrl)
                .info(this.info)
                .member(member)
                .build();
    }

}
