package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "channel_tag")
public class ChannelTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tag_id")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    public ChannelTag() {
    }

    @Builder
    public ChannelTag(Tag tag, Channel channel) {
        this.tag = tag;
        this.channel = channel;
    }



}
