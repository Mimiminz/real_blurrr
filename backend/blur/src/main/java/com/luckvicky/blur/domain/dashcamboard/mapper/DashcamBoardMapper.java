package com.luckvicky.blur.domain.dashcamboard.mapper;

import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamMentionDto;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Option;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Video;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamMentionRepository;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DashcamBoardMapper {

    private final DashcamMentionRepository dashcamMentionRepository;

    public DashcamBoardListDto toDashcamBoardListDto(Dashcam dashcam) {
        List<String> videoUrls = dashcam.getVideos().stream()
                .map(Video::getVideoUrl)
                .collect(Collectors.toList());

        List<DashcamMentionDto> mentionedLeagues = dashcamMentionRepository.findByDashcam(dashcam).stream()
                .map(DashcamMentionDto::of)
                .collect(Collectors.toList());

        return DashcamBoardListDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .member(SimpleMemberDto.of(dashcam.getMember()))
                .viewCount(dashcam.getViewCount())
                .commentCount(dashcam.getCommentCount())
                .likeCount(dashcam.getLikeCount())
                .createdAt(dashcam.getCreatedAt())
                .videoUrl(videoUrls)
                .mentionedLeagues(mentionedLeagues)
                .build();
    }

    public List<DashcamBoardListDto> toDashcamBoardListDtos(List<Dashcam> dashcams) {
        return dashcams.stream()
                .map(this::toDashcamBoardListDto)
                .collect(Collectors.toList());
    }

    public DashcamBoardDetailDto toDashcamBoardDetailDto(Dashcam dashcam, List<CommentDto> comments) {
        List<String> videoUrls = dashcam.getVideos().stream()
                .map(Video::getVideoUrl)
                .collect(Collectors.toList());

        List<Option> sortedOptions = dashcam.getOptions().stream()
                .sorted(Comparator.comparingInt(Option::getNum))
                .collect(Collectors.toList());

        List<DashcamMentionDto> mentionedLeagues = dashcamMentionRepository.findByDashcam(dashcam).stream()
                .map(DashcamMentionDto::of)
                .collect(Collectors.toList());


        return DashcamBoardDetailDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .member(SimpleMemberDto.of(dashcam.getMember()))
                .viewCount(dashcam.getViewCount())
                .commentCount(dashcam.getCommentCount())
                .likeCount(dashcam.getLikeCount())
                .createdAt(dashcam.getCreatedAt())
                .videoUrl(videoUrls)
                .content(dashcam.getContent())
                .options(sortedOptions)
                .mentionedLeagues(mentionedLeagues)
                .comments(comments)
                .build();
    }

}