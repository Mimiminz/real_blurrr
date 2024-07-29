package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelMemberFollow;
import com.luckvicky.blur.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelMemberFollowRepository extends JpaRepository<ChannelMemberFollow, Long> {

    Optional<ChannelMemberFollow> findByMemberAndChannel(Member member, Channel channel);
}
