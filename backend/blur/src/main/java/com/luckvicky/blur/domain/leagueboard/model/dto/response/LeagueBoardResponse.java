package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "리그 게시물 목록 응답")
public record LeagueBoardResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "제목")
        String title,

        @Schema(description = "조회수")
        Long viewCount,

        @Schema(description = "좋아요 개수")
        Long likeCount,

        @Schema(description = "댓글 개수")
        Long commentCount,

        @Schema(description = "생성 시간")
        LocalDateTime createdAt

) {

    public static LeagueBoardResponse of(Board board, Long viewCount) {
        return LeagueBoardResponse.builder()
                .id(board.getId())
                .member(SimpleMemberDto.of(board.getMember()))
                .title(board.getTitle())
                .viewCount(viewCount)
                .likeCount(board.getLikeCount())
                .commentCount(board.getCommentCount())
                .createdAt(board.getCreatedAt())
                .build();
    }

}
