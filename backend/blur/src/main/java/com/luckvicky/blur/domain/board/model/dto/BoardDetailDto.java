package com.luckvicky.blur.domain.board.model.dto;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "게시물 상세 정보")
public class BoardDetailDto {

    @Schema(description = "본문")
    String content;

    @Schema(description = "조회수")
    Long viewCount;

    @Schema(description = "댓글 목록")
    List<CommentDto> comments;

    public static BoardDetailDto of(String content, Long viewCount, List<CommentDto> comments) {
        return BoardDetailDto.builder()
                .content(content)
                .viewCount(viewCount)
                .comments(comments)
                .build();
    }

}
