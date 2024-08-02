package com.luckvicky.blur.domain.vote.model.dto.request;

import com.luckvicky.blur.domain.vote.model.entity.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "옵션 생성 요청")
public record OptionCreateRequest(

        @Schema(description = "옵션 순서", example = "1")
        int optionOrder,

        @NotBlank
        @Schema(description = "옵션 내용", example = "아반떼가 잘못했다.")
        String content

) {

    public Option toEntity() {
        return Option.builder()
                .optionOrder(optionOrder)
                .content(content)
                .build();
    }
}
