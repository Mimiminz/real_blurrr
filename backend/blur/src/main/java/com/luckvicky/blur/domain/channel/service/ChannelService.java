package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChannelService {
    ChannelDto createChannel(ChannelCreateRequest request, UUID memberId);
    List<ChannelDto> getAllChannels(Optional<UUID> optionalMember);
    List<ChannelDto> getFollowedChannels(UUID memberId);
    List<ChannelDto> getCreatedChannels(UUID memberId);
    List<ChannelDto> searchChannelsByKeyword(String keyword, Optional<UUID> optionalMemberId);
    ChannelDto getChannelById(UUID channelId, Optional<UUID> optionalMemberId);
    boolean createFollow(UUID memberId, UUID channelId);
    boolean deleteFollow(UUID memberId, UUID channelId);
}
