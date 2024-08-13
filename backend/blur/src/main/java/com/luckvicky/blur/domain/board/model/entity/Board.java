package com.luckvicky.blur.domain.board.model.entity;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@DiscriminatorColumn()
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "boards")
public class Board extends BaseEntity {

    @Column(nullable = false, columnDefinition = "VARCHAR(35)")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long viewCount = 0L;

    @Column(nullable = false)
    private Long commentCount = 0L;

    @Column(nullable = false)
    private Long likeCount = 0L;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BoardType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", columnDefinition = "BINARY(16)", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    protected Board (String title, String content, BoardType type, Member member) {
        this.title = title;
        this.content = content;
        this.commentCount = 0L;
        this.viewCount = 0L;
        this.likeCount = 0L;
        this.type = type;
        this.member = member;
    }

    public void increaseViewCount()  {
        this.viewCount++;
    }

    public void decreaseViewCount()  {
        this.viewCount--;
        if (this.viewCount == Long.valueOf(-1)) {
            this.viewCount = Long.valueOf(0);
        }
    }

    public void increaseCommentCount()  {
        this.commentCount++;
    }

    public void decreaseCommentCount()  {
        this.commentCount--;
        if (this.commentCount == Long.valueOf(-1)) {
            this.commentCount = Long.valueOf(0);
        }
    }

    public void increaseLikeCount()  {
        this.likeCount++;
    }

    public void decreaseLikeCount()  {
        this.likeCount--;
        if (this.likeCount == Long.valueOf(-1)) {
            this.likeCount = Long.valueOf(0);
        }
    }

    public void setChannel(Channel channel) {
        return;
    }
}
