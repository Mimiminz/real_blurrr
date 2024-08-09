package com.luckvicky.blur.domain.channelboard.model.dto.request;

import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@Schema(name = "내 차 자랑 생성")
public class MyCarCreateRequest extends BoardCreateRequest {
    private String thumbNail;

    @Schema(
            description = "멘션된 리그 이름 리스트 (최대 4개, 선택적)",
            example = "[\"현대\", \"쉐보레\", \"아반떼\"]"
    )
    @Size(max = 4, message = "멘션은 최대 4개까지만 가능합니다.")
    List<String> mentionedLeagueNames;


    public MyCarCreateRequest(String thumbNail) {
        this.thumbNail = thumbNail;
    }

    public MyCarCreateRequest(String title, String content, String boardType, String thumbNail, List<String> mentionedLeagueNames) {
        super(title, content, boardType);
        this.mentionedLeagueNames = mentionedLeagueNames;
        this.thumbNail = thumbNail;
    }
}
