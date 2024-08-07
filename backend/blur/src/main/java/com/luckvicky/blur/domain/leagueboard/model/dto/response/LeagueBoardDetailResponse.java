package com.luckvicky.blur.domain.leagueboard.model.dto.response;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.LeagueBoardDetailDto;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;

@Builder
@Schema(name = "게시글 상세 조회 응답")
public record LeagueBoardDetailResponse(

        @Schema(description = "고유 식별값")
        UUID id,

        @Schema(description = "사용자 정보")
        SimpleMemberDto member,

        @Schema(description = "제목")
        String title,

        @Schema(description = "제목")
        String content,

        @Schema(description = "생성 시간")
        LocalDateTime createdAt,

        @Schema(description = "조회수")
        Long viewCount,

        @Schema(description = "좋아요 수")
        Long likeCount,

        @Schema(description = "좋아요 여부")
        boolean isLike

) {

    public static LeagueBoardDetailResponse of(LeagueBoardDetailDto boardDetail) {
        return LeagueBoardDetailResponse.builder()
                .id(boardDetail.getId())
                .member(boardDetail.getMember())
                .title(boardDetail.getTitle())
                .content(boardDetail.getContent())
                .createdAt(boardDetail.getCreatedAt())
                .viewCount(boardDetail.getViewCount())
                .likeCount(boardDetail.getLikeCount())
                .isLike(boardDetail.isLike())
                .build();
    }

}
