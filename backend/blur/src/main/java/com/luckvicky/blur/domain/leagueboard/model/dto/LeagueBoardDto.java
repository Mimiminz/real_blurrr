package com.luckvicky.blur.domain.leagueboard.model.dto;

import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(name = "리그 게시물 정보")
public class LeagueBoardDto {

    @Schema(description = "고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "제목")
    private String title;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "조회수")
    private Long viewCount;

    @Schema(description = "좋아요 개수")
    private Long likeCount;

    @Schema(description = "댓글 개수")
    private Long commentCount;

    @Schema(description = "생성 시간")
    private LocalDateTime createdAt;

    public static LeagueBoardDto of(LeagueBoard leagueBoard) {

        return LeagueBoardDto.builder()
                .id(leagueBoard.getId())
                .member(SimpleMemberDto.of(leagueBoard.getMember()))
                .title(leagueBoard.getTitle())
                .viewCount(leagueBoard.getViewCount())
                .likeCount(leagueBoard.getLikeCount())
                .commentCount(leagueBoard.getCommentCount())
                .createdAt(leagueBoard.getCreatedAt())
                .build();

    }

}
