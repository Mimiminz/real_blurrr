package com.luckvicky.blur.global.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "무한스크롤 페이지네이션 결과 공통 응답")
public class SliceResponse <T> {

    @Schema(description = "결과")
    private List<T> content;

    @Schema(description = "현재 페이지")
    private int currentPage;

    @Schema(description = "첫 페이지 여부")
    private boolean first;

    @Schema(description = "다음 페이지가 있는지 여부")
    private boolean hasNext;

    @Builder
    private SliceResponse(List<T> content, int currentPage, boolean first, boolean hasNext) {
        this.content = content;
        this.currentPage = currentPage;
        this.first = first;
        this.hasNext = hasNext;
    }

    public static <T> SliceResponse<T> of(Slice<T> slice){
        return SliceResponse.<T>builder()
                .content(slice.getContent())
                .currentPage(slice.getNumber())
                .first(slice.isFirst())
                .hasNext(slice.hasNext())
                .build();
    }

}
