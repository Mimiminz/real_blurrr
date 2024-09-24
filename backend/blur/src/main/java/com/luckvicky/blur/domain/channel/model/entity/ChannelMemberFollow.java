package com.luckvicky.blur.domain.channel.model.entity;

import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        name = "channel_member_follow",
        uniqueConstraints = {
                @UniqueConstraint(
                        name="uniqueMemberChannel",
                        columnNames = {"member_id", "channel_id"}
                )
        }
)
public class ChannelMemberFollow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", columnDefinition = "BINARY(16)")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "channel_id", columnDefinition = "BINARY(16)")
    private Channel channel;

    @Builder
    public ChannelMemberFollow(Member member, Channel channel){
        this.member = member;
        this.channel = channel;
    }

}
