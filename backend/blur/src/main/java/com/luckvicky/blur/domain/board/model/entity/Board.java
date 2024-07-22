package com.luckvicky.blur.domain.board.model.entity;

import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "boards")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends BaseEntity {

    @Id
    @Column(nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    // todo: 멤버 엔티티 연관관계 매핑

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long viewCount;

    @Column(nullable = false)
    private BoardType type;

    @Builder
    public Board (UUID id, String title, String content, BoardType type) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.viewCount = 0L;
        this.type = type;
    }

}
