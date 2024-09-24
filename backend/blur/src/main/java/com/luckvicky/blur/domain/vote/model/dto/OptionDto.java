package com.luckvicky.blur.domain.vote.model.dto;

import com.luckvicky.blur.domain.vote.model.entity.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@Schema(name = "옵션 정보")
public class OptionDto {

    @Schema(description = "옵션 고유 식별값")
    private UUID id;

    @Schema(description = "옵션 순서")
    private int optionOrder;

    @Schema(description = "옵션 이름")
    private String content;

    @Schema(description = "투표 수")
    private Long voteCount;

    public static OptionDto of(Option option){
        return OptionDto.builder()
                .id(option.getId())
                .optionOrder(option.getOptionOrder())
                .content(option.getContent())
                .voteCount(option.getVoteCount())
                .build();
    }

    public static List<OptionDto> of(List<Option> options){
        return options.stream()
                .map(OptionDto::of)
                .collect(Collectors.toList());
    }

}
