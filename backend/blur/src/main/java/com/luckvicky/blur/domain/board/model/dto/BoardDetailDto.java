package com.luckvicky.blur.domain.board.model.dto;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
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

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "본문")
    private String content;

    @Schema(description = "생성 시간")
    private String createdAt;

    @Schema(description = "조회수")
    private Long viewCount;

    @Schema(description = "댓글 개수")
    private Long commentCount;

    @Schema(description = "좋아요 개수")
    private Long  likeCount;

    @Schema(description = "댓글 목록")
    List<CommentDto> comments;


    public static BoardDetailDto of(Board board, List<CommentDto> comments) {
        return BoardDetailDto.builder()
                .id(board.getId())
                .member(SimpleMemberDto.of(board.getMember()))
                .title(board.getTitle())
                .content(board.getContent())
                .createdAt(board.getCreatedAt().toString())
                .viewCount(board.getViewCount())
                .commentCount(board.getCommentCount())
                .likeCount(board.getLikeCount())
                .comments(comments)
                .build();
    }

}
