package com.luckvicky.blur.domain.comment.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.luckvicky.blur.domain.member.model.MemberDto;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "대댓글")
public class ReplyDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "작성자 정보")
    private MemberDto member;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "생성일자")
    private String createdAt;
    
    @Schema(description = "활성화 상태")
    private ActivateStatus status;

}
