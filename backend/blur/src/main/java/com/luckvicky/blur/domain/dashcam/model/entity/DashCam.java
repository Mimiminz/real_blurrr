package com.luckvicky.blur.domain.dashcam.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dashcams")
public class DashCam extends Board {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", columnDefinition = "BINARY(36)")
    Channel channel;

    @ElementCollection
    @CollectionTable(name = "options", joinColumns = @JoinColumn(name = "id"))
    private List<Option> options = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "videos", joinColumns = @JoinColumn(name = "id"))
    private List<Video> videos = new ArrayList<>();

    public DashCam(
            String title, String content, BoardType type, Member member, Channel channel, List<Option> options, List<Video> videos
    ) {
        super(title, content, type, member);
        this.channel = channel;
        this.options = options;
        this.videos = videos;
    }

}


