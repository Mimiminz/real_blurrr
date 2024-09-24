package com.luckvicky.blur.domain.dashcam.mapper;

import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.VideoDto;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DashcamBoardMapper {

    private final MentionRepository mentionRepository;

    public DashcamBoardListDto toDashcamBoardListDto(DashCam dashcam) {

        List<MentionDto> mentionedLeagues = mentionRepository.findAllByBoard(dashcam).stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());

        return DashcamBoardListDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .member(SimpleMemberDto.of(dashcam.getMember()))
                .viewCount(dashcam.getViewCount())
                .commentCount(dashcam.getCommentCount())
                .likeCount(dashcam.getLikeCount())
                .createdAt(dashcam.getCreatedAt())
                .thumbNail(dashcam.getThumbnail())
                .mentionedLeagues(mentionedLeagues)
                .build();
    }

    public List<DashcamBoardListDto> toDashcamBoardListDtos(List<DashCam> dashCams) {
        return dashCams.stream()
                .map(this::toDashcamBoardListDto)
                .collect(Collectors.toList());
    }

    public DashcamBoardDetailDto toDashcamBoardDetailDto(DashCam dashcam, Long viewCount, boolean isLiked) {
        List<VideoDto> videos = dashcam.getVideos().stream()
                .map(video -> VideoDto.of(video.getVideoOrder(), video.getVideoUrl()))
                .collect(Collectors.toList());


        List<MentionDto> mentionedLeagues = mentionRepository.findAllByBoard(dashcam).stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());


        return DashcamBoardDetailDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .member(SimpleMemberDto.of(dashcam.getMember()))
                .viewCount(viewCount)
                .commentCount(dashcam.getCommentCount())
                .likeCount(dashcam.getLikeCount())
                .createdAt(dashcam.getCreatedAt())
                .voteCount(dashcam.getTotalVoteCount())
                .voteTitle(dashcam.getVoteTitle())
                .videos(videos)
                .content(dashcam.getContent())
                .mentionedLeagues(mentionedLeagues)
                .isLiked(isLiked)
                .build();
    }

}