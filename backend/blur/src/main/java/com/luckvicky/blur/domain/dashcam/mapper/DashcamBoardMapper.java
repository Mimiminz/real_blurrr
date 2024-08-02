package com.luckvicky.blur.domain.dashcam.mapper;

import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.model.entity.Video;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import com.luckvicky.blur.domain.vote.model.dto.OptionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DashcamBoardMapper {

    private final MentionRepository mentionRepository;

    public DashcamBoardListDto toDashcamBoardListDto(DashCam dashcam) {
        List<String> videoUrls = dashcam.getVideos().stream()
                .map(Video::getUrl)
                .collect(Collectors.toList());

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
                .videoUrl(videoUrls)
                .mentionedLeagues(mentionedLeagues)
                .build();
    }

    public List<DashcamBoardListDto> toDashcamBoardListDtos(List<DashCam> dashCams) {
        return dashCams.stream()
                .map(this::toDashcamBoardListDto)
                .collect(Collectors.toList());
    }

    public DashcamBoardDetailDto toDashcamBoardDetailDto(DashCam dashcam, List<CommentDto> comments) {
        List<String> videoUrls = dashcam.getVideos().stream()
                .map(Video::getUrl)
                .collect(Collectors.toList());

        List<OptionDto> optionDtos = dashcam.getOptions().stream()
                .map(option -> OptionDto.builder()
                        .id(option.getId())
                        .optionOrder(option.getOptionOrder())
                        .content(option.getContent())
                        .voteCount(option.getVoteCount())
                        .build())
                .collect(Collectors.toList());

        List<MentionDto> mentionedLeagues = mentionRepository.findAllByBoard(dashcam).stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());


        return DashcamBoardDetailDto.builder()
                .id(dashcam.getId())
                .title(dashcam.getTitle())
                .member(SimpleMemberDto.of(dashcam.getMember()))
                .viewCount(dashcam.getViewCount())
                .commentCount(dashcam.getCommentCount())
                .likeCount(dashcam.getLikeCount())
                .createdAt(dashcam.getCreatedAt())
                .voteCount(dashcam.getTotalVoteCount())
                .videoUrl(videoUrls)
                .content(dashcam.getContent())
                .options(optionDtos)
                .mentionedLeagues(mentionedLeagues)
                .comments(comments)
                .build();
    }

}