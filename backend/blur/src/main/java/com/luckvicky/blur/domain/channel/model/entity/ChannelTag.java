package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Entity
@Table(name = "channel_tag")
public class ChannelTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="tags_id")
    private Tags tag;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channels channel;

    public ChannelTag() {
    }

    @Builder
    public ChannelTag(Long id, Tags tag, Channels channel) {
        this.id = id;
        this.tag = tag;
        this.channel = channel;
    }

}
