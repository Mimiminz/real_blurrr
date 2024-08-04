package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.exception.NotExistFollowException;
import com.luckvicky.blur.domain.channel.mapper.ChannelMapper;
import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelMemberFollow;
import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import com.luckvicky.blur.domain.channel.repository.ChannelMemberFollowRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelTagRepository;
import com.luckvicky.blur.domain.channel.repository.TagRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final ChannelTagRepository channelTagRepository;
    private final TagRepository tagRepository;
    private final MemberRepository memberRepository;
    private final ChannelMemberFollowRepository channelMemberFollowRepository;

    @Override
    @Transactional
    public ChannelDto createChannel(ChannelCreateRequest request, UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);

        Channel channel = request.toEntity(member);
        channel = channelRepository.save(channel);

        List<Tag> tags = tagRepository.findAllByNameIn(request.tags());
        Map<String, Tag> existingTagMap = tags.stream()
                .collect(Collectors.toMap(Tag::getName, tag -> tag));

        for (String tagName : request.tags()) {
            Tag tag = existingTagMap.get(tagName);
            if (tag == null) {
                tag = Tag.builder().name(tagName).build();
                tag = tagRepository.save(tag);
            }

            ChannelTag channelTag = ChannelTag.builder()
                    .channel(channel)
                    .tag(tag)
                    .build();
            channelTagRepository.save(channelTag);
        }

        return ChannelMapper.convertToDto(channel);
    }


    @Override
    public List<ChannelDto> getAllChannels(Optional<UUID> optionalMemberId) {
        List<UUID> channelIds = channelRepository.findAllChannelIds();
        List<ChannelDto> channelDtos;

        if (optionalMemberId.isEmpty()) {
            channelDtos = getChannelDtos(channelIds);
        } else {
            channelDtos = getChannelDtosWithFollowInfo(optionalMemberId.get(), channelIds);
        }
        return channelDtos;
    }

    @Override
    public List<ChannelDto> getFollowedChannels(UUID memberId) {
        List<UUID> channelIds = channelMemberFollowRepository.findChannelIdsByMemberId(memberId);
        return getChannelDtosWithFollowInfo(memberId, channelIds);
    }

    @Override
    public List<ChannelDto> getCreatedChannels(UUID memberId) {
        List<UUID> channelIds = channelRepository.findChannelIdsByOwnerId(memberId);
        return getChannelDtosWithFollowInfo(memberId, channelIds);
    }


    @Override
    public List<ChannelDto> searchChannelsByKeyword(String keyword, Optional<UUID> optionalMemberId) {

        // 1. 이름 중 키워드 포함하는 채널 검색
        List<Channel> channelsByName = channelRepository.findByNameContainingIgnoreCase(keyword);

        // 2-1. 태그 중 키워드 포함하는 채널 검색
        List<ChannelTag> channelTagsByKeyword = channelTagRepository.findByTagNameContainingIgnoreCase(keyword);

        // 2-2. 채널 추출
        List<Channel> channelsByTag = channelTagsByKeyword.stream()
                .map(ChannelTag::getChannel)
                .distinct()
                .toList();

        // 3. 채널 병합
        Set<Channel> allChannels = new HashSet<>();
        allChannels.addAll(channelsByName);
        allChannels.addAll(channelsByTag);

        Member member = optionalMemberId.map(memberRepository::getOrThrow)
                .orElse(null);

        return allChannels.stream()
                .map(channel -> {
                    if(Objects.nonNull(member)) {
                        var dto = ChannelMapper.convertToDto(channel);
                        dto.setIsFollowed(member.getFollowingChannels().contains(channel));
                        return dto;
                    } else {
                        return ChannelMapper.convertToDto(channel);
                    }
                })
                .toList();
    }


    @Override
    public ChannelDto getChannelById(UUID channelId, Optional<UUID> optionalMemberId) {
        Channel channel = channelRepository.getOrThrow(channelId);
        ChannelDto dto = ChannelMapper.convertToDto(channel);
        if (optionalMemberId.isPresent()) {
            Member member = memberRepository.getOrThrow(optionalMemberId.get());
            dto.setIsFollowed(member.getFollowingChannels().contains(channel));
        }
        return dto;
    }

    @Override
    @Transactional
    public boolean createFollow(UUID memberId, UUID channelId) {
        Member member = memberRepository.getOrThrow(memberId);
        Channel channel = channelRepository.getOrThrow(channelId);

        if(member.getFollowingChannels().contains(channel)) {
            return false;
        }
        channel.increaseFollowCount();

        channelMemberFollowRepository.save(
                ChannelMemberFollow.builder()
                        .member(member)
                        .channel(channel)
                        .build()
        );
        return true;
    }

    @Override
    @Transactional
    public boolean deleteFollow(UUID memberId, UUID channelId) {

        Member member = memberRepository.getOrThrow(memberId);
        Channel channel = channelRepository.getOrThrow(channelId);

        ChannelMemberFollow findFollow = channelMemberFollowRepository.findByMemberAndChannel(member, channel)
                .orElseThrow(NotExistFollowException::new);

        channel.decreaseFollowCount();
        channelMemberFollowRepository.deleteById(findFollow.getId());

        return true;
    }


    private List<ChannelDto> getChannelDtos(List<UUID> channelIds) {
        if (channelIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<Channel> channels = channelRepository.findAllById(channelIds);

        return channels.stream()
                .map(ChannelMapper::convertToDto)
                .collect(Collectors.toList());
    }

    private List<ChannelDto> getChannelDtosWithFollowInfo(UUID memberId, List<UUID> channelIds) {
        var member = memberRepository.getOrThrow(memberId);
        Set<UUID> followingChannelIds = member.getFollowingChannels()
                .stream()
                .map(Channel::getId)
                .collect(Collectors.toSet());
        List<ChannelDto> channelDtos = getChannelDtos(channelIds);
        channelDtos.forEach(it -> it.setIsFollowed(followingChannelIds.contains(it.getId())));
        return channelDtos;
    }

}
