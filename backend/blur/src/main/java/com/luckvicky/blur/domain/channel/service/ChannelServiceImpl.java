package com.luckvicky.blur.domain.channel.service;

import static com.luckvicky.blur.global.constant.Number.CHANNEL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.CREATE_CHANNEL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.FOLLOW_CHANNEL_PAGE_SIZE;

import com.amazonaws.services.ec2.model.TagDescription;
import com.luckvicky.blur.domain.channel.exception.NotExistFollowException;
import com.luckvicky.blur.domain.channel.mapper.ChannelMapper;
import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.TagDto;
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
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.SliceResponse;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    public SliceResponse<ChannelDto> getAllChannels(ContextMember nullableMember, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, CHANNEL_PAGE_SIZE);
        Slice<UUID> channelIdsSlice = channelRepository.findAllChannelIds(pageable);

        List<ChannelDto> channelDtos;
        if (Objects.isNull(nullableMember)) {
            channelDtos = getChannelDtos(channelIdsSlice.getContent());
        } else {
            channelDtos = getChannelDtosWithFollowInfo(nullableMember.getId(), channelIdsSlice.getContent());
        }
        return new SliceResponse<>(
                channelDtos,
                channelIdsSlice.getNumber(),
                channelIdsSlice.isFirst(),
                channelIdsSlice.hasNext()
        );
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
    public SliceResponse<ChannelDto> searchChannelsByKeywords(String keyword, ContextMember nullableMember, int pageNumber) {
        if (keyword.isEmpty()) {
            return new SliceResponse<>(Collections.emptyList(), pageNumber, true, false);
        }

        Pageable pageable = PageRequest.of(pageNumber, CHANNEL_PAGE_SIZE);

        Slice<Channel> channelSlice = channelRepository.findByKeyword(keyword, pageable);


        List<ChannelDto> channelDtos;
        if (Objects.isNull(nullableMember)) {
            channelDtos = getChannelDtos(channelSlice.getContent().stream().map(Channel::getId).toList());
        } else {
            channelDtos = getChannelDtosWithFollowInfo(nullableMember.getId(), channelSlice.getContent().stream().map(Channel::getId).toList());
        }


        return new SliceResponse<>(
                channelDtos,
                channelSlice.getNumber(),
                channelSlice.isFirst(),
                channelSlice.hasNext()
        );


    }


    @Override
    public ChannelDto getChannelById(UUID channelId, ContextMember nullableMember) {
        Channel channel = channelRepository.getOrThrow(channelId);
        ChannelDto dto = ChannelMapper.convertToDto(channel);
        if (Objects.nonNull(nullableMember)) {
            Member member = memberRepository.getOrThrow(nullableMember.getId());
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

    @Override
    @Transactional(readOnly = true)
    public List<TagDto> searchTagsByKeyword(String keyword) {
        List<Tag> tags = tagRepository.findAllByNameContainingIgnoreCase(keyword);

        return tags.stream()
                .limit(5)
                .map(TagDto::of)
                .collect(Collectors.toList());
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
