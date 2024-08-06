package com.luckvicky.blur.domain.channelboard.model.dto.request;


import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@Schema(name = "내 차 자랑 생성")
public class MyCarCreateRequest extends BoardCreateRequest {
    private String thumbNail;

    public MyCarCreateRequest(String thumbNail) {
        this.thumbNail = thumbNail;
    }

    public MyCarCreateRequest(String title, String content, String boardType, String thumbNail) {
        super(title, content, boardType);
        this.thumbNail = thumbNail;
    }
}
