package com.luckvicky.blur.domain.channel.service;

import com.luckvicky.blur.domain.channel.exception.FailToCreateFollowException;
import com.luckvicky.blur.domain.channel.exception.FailToDeleteFollowException;
import com.luckvicky.blur.domain.channel.exception.NotExistFollowException;
import com.luckvicky.blur.domain.channel.mapper.ChannelMapper;
import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelMemberFollow;
import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import com.luckvicky.blur.domain.channel.repository.ChannelMemberFollowRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelTagRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channel.repository.TagRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService{

    private final ChannelRepository channelRepository;
    private final ChannelTagRepository channelTagRepository;
    private final TagRepository tagRepository;
    private final MemberRepository memberRepository;
    private final ChannelMemberFollowRepository channelMemberFollowRepository;
    private final ChannelMapper channelMapper;

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

        // 저장된 태그들을 다시 조회
        List<Tag> savedTags = channelTagRepository.findByChannelId(channel.getId())
                .stream()
                .map(ChannelTag::getTag)
                .collect(Collectors.toList());

        return channelMapper.convertToDto(channel, savedTags);
    }



    @Override
    public List<ChannelDto> getAllChannels(){
        List<Channel> channels = channelRepository.findAll();
        List<UUID> channelIds = channels.stream()
                .map(Channel::getId)
                .collect(Collectors.toList());

        List<ChannelTag> channelTags = channelTagRepository.findByChannelIdIn(channelIds);

        Map<UUID, List<Tag>> channelTagsMap = channelTags.stream()
                .collect(Collectors.groupingBy(
                        ct -> ct.getChannel().getId(),
                        Collectors.mapping(ChannelTag::getTag, Collectors.toList())
                ));

        return channels.stream()
                .map(channel -> channelMapper.convertToDto(channel,
                        channelTagsMap.getOrDefault(channel.getId(), Collections.emptyList())))
                .collect(Collectors.toList());
    }

    @Override
    public List<ChannelDto> searchChannelsByTags(List<String> tagNames) {
        List<ChannelTag> channelTags = channelTagRepository.findByTagNameIn(tagNames);

        return channelTags.stream()
                .collect(Collectors.groupingBy(
                        ChannelTag::getChannel,
                        Collectors.mapping(ChannelTag::getTag, Collectors.toList())
                ))
                .entrySet().stream()
                .map(entry -> channelMapper.convertToDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public Boolean createFollow(UUID memberId, UUID channelId) {
        Member member = memberRepository.getOrThrow(memberId);
        Channel channel = channelRepository.getOrThrow(channelId);

        channel.increaseFollowCount();

        ChannelMemberFollow createdFollow = channelMemberFollowRepository.save(
                ChannelMemberFollow.builder()
                        .member(member)
                        .channel(channel)
                        .build()
        );
        return inCreated(createdFollow);
    }

    @Override
    public Boolean deleteFollow(UUID memberId, UUID channelId) {

        Member member = memberRepository.getOrThrow(memberId);
        Channel channel = channelRepository.getOrThrow(channelId);

        channel.decreaseFollowCount();

        ChannelMemberFollow findFollow = channelMemberFollowRepository.findByMemberAndChannel(member, channel)
                .orElseThrow(NotExistFollowException::new);

        channelMemberFollowRepository.deleteById(findFollow.getId());
        channelRepository.save(channel);

        return isDeleted(findFollow);
    }

    private Boolean inCreated(ChannelMemberFollow createdFollow){
        channelMemberFollowRepository.findById(createdFollow.getId())
                .orElseThrow(FailToCreateFollowException::new);

        return true;
    }

    private Boolean isDeleted(ChannelMemberFollow findFollow){
        if(channelMemberFollowRepository.existsById(findFollow.getId())) {
            throw new FailToDeleteFollowException();
        }

        return true;
    }


}
