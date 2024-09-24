package com.luckvicky.blur.global.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Schema(name = "페이지네이션 결과 공통 응답")
public class PaginatedResponse<T> {

    @Schema(description = "전체 페이지 수")
    private int totalPages;

    @Schema(description = "전체 요소 수")
    private long totalElements;

    @Schema(description = "현재 페이지")
    private int pageNumber;

    @Schema(description = "페이지 크기")
    private int pageSize;

    @Schema(description = "결과")
    private List<T> content;

    @Builder
    private PaginatedResponse(int pageNumber, int pageSize, long totalElements, int totalPages, List<T> content) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.content = content;
    }

    public static <T> PaginatedResponse<T> of(int pageNumber, int pageSize, long totalElements, int totalPage, List<T> content) {
        return PaginatedResponse.<T>builder()
                .pageNumber(pageNumber)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .totalPages(totalPage)
                .content(content)
                .build();

    }

    public static <T> PaginatedResponse<T> of(Page<T> page) {
        return PaginatedResponse.<T>builder()
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .content(page.getContent())
                .build();

    }

}
