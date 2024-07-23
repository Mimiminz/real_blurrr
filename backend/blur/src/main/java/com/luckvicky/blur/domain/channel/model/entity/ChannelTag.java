package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Table(name = "channel_tag")
public class ChannelTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="tag_id")
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    public ChannelTag() {
    }

    @Builder
    public ChannelTag(Long id, Tag tag, Channel channel) {
        this.id = id;
        this.tag = tag;
        this.channel = channel;
    }

}
