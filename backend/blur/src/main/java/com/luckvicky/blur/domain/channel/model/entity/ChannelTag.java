package com.luckvicky.blur.domain.channel.model.entity;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UUID;

@Entity
@Table(name = "channel_tag")
public class ChannelTag {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name="tags_id")
    private Tags tag;

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channels channel;


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

    public ChannelTag(){

    }

    public ChannelTag(Tags tag, Channels channel) {
        this.tag = tag;
        this.channel = channel;
    }
}
