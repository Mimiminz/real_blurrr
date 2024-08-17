package com.luckvicky.blur.domain.mycar.model.resp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MyCarDetail {
    @Schema(description = "게시물 고유 식별값")
    private UUID id;

    @Schema(description = "사용자 정보")
    private SimpleMemberDto member;

    @Schema(description = "게시물 제목")
    private String title;

    @Schema(description = "게시물 조회수")
    private Long viewCount;

    @Schema(description = "댓글 개수")
    private Long commentCount;

    @Schema(description = "좋아요 개수")
    private Long likeCount;

    @Schema(description = "게시물 생성 시간")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Schema(description = "멘션된 리그 목록")
    private List<MentionDto> mentionedLeagues;

    @Schema(description = "좋아요 여부")
    private boolean isLiked;

    @Schema(description = "썸네일")
    private String thumbNail;

    public static MyCarDetail of(MyCarBoard myCarBoard, Long viewCount, List<Mention> mentionList, boolean isLiked) {
        return MyCarDetail.builder()
                .id(myCarBoard.getId())
                .member(SimpleMemberDto.of(myCarBoard.getMember()))
                .likeCount(myCarBoard.getLikeCount())
                .viewCount(viewCount)
                .commentCount(myCarBoard.getCommentCount())
                .isLiked(isLiked)
                .title(myCarBoard.getTitle())
                .content(myCarBoard.getContent())
                .thumbNail(myCarBoard.getThumbnail())
                .createdAt(myCarBoard.getCreatedAt())
                .mentionedLeagues(mentionList.stream().map(MentionDto::of).toList())
                .build();
    }
}
