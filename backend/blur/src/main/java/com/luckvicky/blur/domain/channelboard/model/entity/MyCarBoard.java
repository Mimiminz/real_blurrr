package com.luckvicky.blur.domain.channelboard.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyCarBoard extends Board {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", columnDefinition = "BINARY(16)")
    Channel channel;

    @Column(nullable = false, columnDefinition = "TEXT")
    String thumbnail;

    public MyCarBoard(Channel channel, String thumbnail) {
        this.channel = channel;
        this.thumbnail = thumbnail;
    }

    public MyCarBoard(String title, String content, BoardType type, Member member, Channel channel, String thumbnail) {
        super(title, content, type, member);
        this.channel = channel;
        this.thumbnail = thumbnail;
    }

    @Override
    public void setChannel(Channel channel) {
        this.channel = channel;
    }
}
