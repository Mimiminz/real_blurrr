package com.luckvicky.blur.domain.comment.model.entity;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "comments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "comment_id",
            columnDefinition = "BINARY(36)",
            referencedColumnName = "id",
            updatable = false
    )
    private Comment comment;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> reply;

    @ManyToOne
    @JoinColumn(name = "board_id", columnDefinition = "BINARY(36)")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id", columnDefinition = "BINARY(36)")
    private Member member;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private CommentType type;

    @Builder
    public Comment(Comment comment, Board board, Member member, String content, CommentType type) {
        this.comment = comment;
        this.board = board;
        this.member = member;
        this.content = content;
        this.type = type;
    }

}
