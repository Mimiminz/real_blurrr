package com.luckvicky.blur.domain.channelboard.mapper;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardMentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoardMention;
import com.luckvicky.blur.domain.member.model.MemberDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChannelBoardMapper {

    public ChannelBoardListDto toChannelBoardListDto(ChannelBoard channelBoard, List<ChannelBoardMention> mentions) {
        BoardDto boardDto = toBoardDto(channelBoard);
        List<ChannelBoardMentionDto> mentionDtos = toChannelBoardMentionDtoList(mentions);

        return ChannelBoardListDto.of(boardDto, mentionDtos);
    }

    private BoardDto toBoardDto(ChannelBoard channelBoard) {
        return BoardDto.builder()
                .id(channelBoard.getId())
                .member(MemberDto.of(channelBoard.getMember()))
                .title(channelBoard.getTitle())
                .createdAt(channelBoard.getCreatedAt().toString())
                .commentCount(channelBoard.getCommentCount())
                .likeCount(channelBoard.getLikeCount())
                .build();
    }

    private List<ChannelBoardMentionDto> toChannelBoardMentionDtoList(List<ChannelBoardMention> mentions) {
        return mentions.stream()
                .map(ChannelBoardMentionDto::of)
                .collect(Collectors.toList());
    }

    public List<ChannelBoardListDto> toChannelBoardListDtoList(List<ChannelBoard> channelBoards, List<List<ChannelBoardMention>> mentionsList) {
        return channelBoards.stream()
                .map(channelBoard -> {
                    int index = channelBoards.indexOf(channelBoard);
                    return toChannelBoardListDto(channelBoard, mentionsList.get(index));
                })
                .collect(Collectors.toList());
    }

}
