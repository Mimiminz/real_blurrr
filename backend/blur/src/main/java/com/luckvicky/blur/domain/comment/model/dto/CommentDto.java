package com.luckvicky.blur.domain.comment.model.dto;

import com.luckvicky.blur.domain.member.model.MemberDto;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.Getter;

@Getter
@Schema(name = "댓글")
public class CommentDto {

    @Schema(description = "고유 식별값")
    private UUID id;
    
    @Schema(description = "작성자 정보")
    private SimpleMemberDto member;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "생성일자")
    private String createdAt;

    @Schema(description = "활성화 상태")
    private ActivateStatus status;
    
    @Schema(description = "대댓글 목록")
    List<ReplyDto> replies;

}
