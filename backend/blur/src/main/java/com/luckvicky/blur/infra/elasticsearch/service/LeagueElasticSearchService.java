package com.luckvicky.blur.infra.elasticsearch.service;

import com.luckvicky.blur.domain.league.model.dto.response.LeagueSearchResponse;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;

public interface LeagueElasticSearchService {

    PaginatedResponse<LeagueSearchResponse> searchLeagueByName(String name);
    void save();

}
