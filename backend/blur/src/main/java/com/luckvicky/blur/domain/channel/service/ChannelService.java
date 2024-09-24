package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.SliceResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Pageable;

public interface ChannelService {
    ChannelDto createChannel(ChannelCreateRequest request, UUID memberId);
    SliceResponse<ChannelDto> getAllChannels(Pageable pageable);
    List<ChannelDto> getFollowedChannels(UUID memberId);
    List<ChannelDto> getCreatedChannels(UUID memberId);
    SliceResponse<ChannelDto> searchChannelsByKeyword(String keyword, Pageable pageable);
    ChannelDto getChannelById(UUID channelId, ContextMember nullableMember);
    boolean createFollow(UUID memberId, UUID channelId);
    boolean deleteFollow(UUID memberId, UUID channelId);
    List<TagDto> searchTagsByKeyword(String keyword);
}
