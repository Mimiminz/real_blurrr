package com.luckvicky.blur.domain.dashcamboard.mapper;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DashcamBoardMapper {

    public DashcamBoardListDto toDashcamBoardListDto(Dashcam dashcam) {
        List<String> videoUrls = dashcam.getVideos().stream()
                .map(video -> video.getVideoUrl())
                .collect(Collectors.toList());

        return DashcamBoardListDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .viewCount(dashcam.getViewCount())
                .createdAt(dashcam.getCreatedAt())
                .videoUrl(videoUrls)
                .build();
    }

    public List<DashcamBoardListDto> toDashcamBoardListDtos(List<Dashcam> dashcams) {
        return dashcams.stream()
                .map(this::toDashcamBoardListDto)
                .collect(Collectors.toList());
    }
}
