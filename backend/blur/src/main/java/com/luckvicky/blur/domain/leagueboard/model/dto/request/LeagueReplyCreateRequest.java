package com.luckvicky.blur.domain.leagueboard.model.dto.request;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.member.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
@Schema(name = "리그 게시글 대댓글 생성 요청")
public record LeagueReplyCreateRequest(

        @NotBlank
        @Size(min = 1, max = 200)
        @Schema(description = "작성 내용", example ="대댓글")
        String content

) {

    public Comment toEntity(Comment comment, Member member, Board board) {

        return Comment.builder()
                .comment(comment)
                .member(member)
                .board(board)
                .content(this.content)
                .type(CommentType.REPLY)
                .build();

    }

}
