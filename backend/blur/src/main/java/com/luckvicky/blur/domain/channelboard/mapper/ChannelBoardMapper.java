package com.luckvicky.blur.domain.channelboard.mapper;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.MentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.member.model.SimpleMemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChannelBoardMapper {

    private final MentionRepository mentionRepository;

    public ChannelBoardListDto toChannelBoardListDto(ChannelBoard channelBoard, List<Mention> mentions) {
        BoardDto boardDto = toBoardDto(channelBoard);
        List<MentionDto> mentionDtos = toChannelBoardMentionDtoList(mentions);

        return ChannelBoardListDto.of(boardDto, mentionDtos);
    }

    private BoardDto toBoardDto(ChannelBoard channelBoard) {
        return BoardDto.builder()
                .id(channelBoard.getId())
                .member(SimpleMemberDto.of(channelBoard.getMember()))
                .title(channelBoard.getTitle())
                .createdAt(channelBoard.getCreatedAt().toString())
                .commentCount(channelBoard.getCommentCount())
                .likeCount(channelBoard.getLikeCount())
                .viewCount(channelBoard.getViewCount())
                .simpleContent(channelBoard.getContent())
                .build();
    }

    private List<MentionDto> toChannelBoardMentionDtoList(List<Mention> mentions) {
        return mentions.stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());
    }

    public List<ChannelBoardListDto> toChannelBoardListDtoList(List<ChannelBoard> channelBoards, List<List<Mention>> mentionsList) {
        return channelBoards.stream()
                .map(channelBoard -> {
                    int index = channelBoards.indexOf(channelBoard);
                    return toChannelBoardListDto(channelBoard, mentionsList.get(index));
                })
                .collect(Collectors.toList());
    }

    public ChannelBoardDetailDto toChannelBoardDto(ChannelBoard channelBoard) {
        List<MentionDto> mentionedLeagues = mentionRepository.findAllByBoard(channelBoard).stream()
                .map(MentionDto::of)
                .collect(Collectors.toList());

        return ChannelBoardDetailDto.builder()
                .id(channelBoard.getId())
                .member(SimpleMemberDto.of(channelBoard.getMember()))
                .title(channelBoard.getTitle())
                .viewCount(channelBoard.getViewCount())
                .commentCount(channelBoard.getCommentCount())
                .likeCount(channelBoard.getLikeCount())
                .createdAt(channelBoard.getCreatedAt())
                .content(channelBoard.getContent())
                .mentionedLeagues(mentionedLeagues)
                .build();
    }


}
