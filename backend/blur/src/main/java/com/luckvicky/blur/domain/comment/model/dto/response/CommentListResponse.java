package com.luckvicky.blur.domain.comment.model.dto.response;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "댓글 목록 조회 응답")
public record CommentListResponse(
        List<CommentDto> comments
) {

    public static CommentListResponse of(List<CommentDto> comments) {
        return CommentListResponse.builder()
                .comments(comments)
                .build();
    }

}
