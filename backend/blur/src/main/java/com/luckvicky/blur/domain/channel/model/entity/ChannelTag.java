package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "channel_tag")
public class ChannelTag {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne
    @JoinColumn(name="tags_id")
    private Tags tag;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channels channel;

    public ChannelTag() {
    }

    public ChannelTag(UUID id, Tags tag, Channels channel) {
        this.id = id;
        this.tag = tag;
        this.channel = channel;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Tags getTag() {
        return tag;
    }

    public void setTag(Tags tag) {
        this.tag = tag;
    }

    public Channels getChannel() {
        return channel;
    }

    public void setChannel(Channels channel) {
        this.channel = channel;
    }
}
