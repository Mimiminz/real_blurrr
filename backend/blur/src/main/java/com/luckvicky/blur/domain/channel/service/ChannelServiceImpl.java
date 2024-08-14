package com.luckvicky.blur.domain.channel.service;

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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public SliceResponse<ChannelDto> getAllChannels(Pageable pageable) {
        Slice<ChannelDto> channelSlice = channelRepository.findAll(pageable).map(ChannelDto::of);
        return SliceResponse.of(channelSlice);
    }

    @Override
    public List<ChannelDto> getFollowedChannels(UUID memberId) {
        Member member = memberRepository.getOrThrow(memberId);

        List<ChannelMemberFollow> channelMemberFollows = channelMemberFollowRepository.findAllByMember(member);

        return channelMemberFollows.stream()
                .map(follow ->
                     ChannelDto.of(follow.getChannel())
                ).collect(Collectors.toList());
    }

    @Override
    public List<ChannelDto> getCreatedChannels(UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        List<Channel> channels = channelRepository.findChannelsByOwner(member);

        return channels.stream().map(ChannelDto::of).collect(Collectors.toList());
    }


    @Override
    public SliceResponse<ChannelDto> searchChannelsByKeyword(String keyword, Pageable pageable) {
        Slice<ChannelDto> channelSlice = channelRepository.findByKeyword(keyword, pageable).map(ChannelDto::of);

        return SliceResponse.of(channelSlice);


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

        if(member.getFollowingChannels()!= null && member.getFollowingChannels().contains(channel)) {
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
}
