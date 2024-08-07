package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelMemberFollow;
import com.luckvicky.blur.domain.member.model.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChannelMemberFollowRepository extends JpaRepository<ChannelMemberFollow, Long> {

    @Query("SELECT cmf.channel.id FROM ChannelMemberFollow cmf WHERE cmf.member.id = :memberId")
    List<UUID> findChannelIdsByMemberId(@Param("memberId") UUID memberId);

    List<ChannelMemberFollow> findAllByMember(Member member);

    Optional<ChannelMemberFollow> findByMemberAndChannel(Member member, Channel channel);
}
