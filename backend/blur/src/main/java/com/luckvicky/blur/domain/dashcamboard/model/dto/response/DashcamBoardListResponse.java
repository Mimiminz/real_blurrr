package com.luckvicky.blur.domain.dashcamboard.model.dto.response;

import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DashcamBoardListResponse {
    private List<DashcamBoardListDto> boards;

    public static DashcamBoardListResponse of(List<DashcamBoardListDto> boards){
        return DashcamBoardListResponse.builder()
                .boards(boards)
                .build();
    }
}
