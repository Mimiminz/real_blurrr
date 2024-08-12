package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.UUID;

public interface LeagueBoardSearchService {

    PaginatedResponse<LeagueBoardResponse> search(
            UUID leagueId, String leagueType, String keyword, int pageNumber, String criteria
    );

}
