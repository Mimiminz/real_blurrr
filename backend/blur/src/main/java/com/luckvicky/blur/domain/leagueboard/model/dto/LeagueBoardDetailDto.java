package com.luckvicky.blur.domain.leagueboard.model.dto;

import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "리그 게시물 상세 정보")
public class LeagueBoardDetailDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "본문")
    private String content;

    @Schema(description = "생성 시간")
    private LocalDateTime createdAt;

    @Schema(description = "조회수")
    private Long viewCount;

    @Schema(description = "좋아요 여부")
    private boolean isLike;

    @Schema(description = "좋아요 수")
    private Long likeCount;

    public static LeagueBoardDetailDto of(LeagueBoard leagueBoard, Long viewCount, Boolean isLike) {
        return LeagueBoardDetailDto.builder()
                .id(leagueBoard.getId())
                .member(SimpleMemberDto.of(leagueBoard.getMember()))
                .title(leagueBoard.getTitle())
                .content(leagueBoard.getContent())
                .createdAt(leagueBoard.getCreatedAt())
                .viewCount(viewCount)
                .likeCount(leagueBoard.getLikeCount())
                .isLike(isLike)
                .build();
    }

}
