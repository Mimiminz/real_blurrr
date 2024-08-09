package com.luckvicky.blur.infra.elasticsearch.controller;

import com.luckvicky.blur.domain.league.model.dto.response.LeagueSearchResponse;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import com.luckvicky.blur.infra.elasticsearch.service.LeagueElasticSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 API (Elastic Search)")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueElasticSearchController {

    private final LeagueElasticSearchService leagueElasticSearchService;

    @GetMapping("/save")
    public ResponseEntity<Result<Boolean>> save() {

        leagueElasticSearchService.save();
        return ResponseUtil.ok(Result.of(Boolean.TRUE));

    }

    @Operation(summary = "리그 검색 API", description = "이름과 일치하는 리그 목록을 조회한다.")
    @GetMapping("/search")
    @Parameter(name = "name", description = "리그 이름", example = "현대")
    public ResponseEntity<Result<PaginatedResponse<LeagueSearchResponse>>> searchLeagueByName(
            @RequestParam("name") String name
    ) {

        PaginatedResponse<LeagueSearchResponse> response = leagueElasticSearchService.searchLeagueByName(name);

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));
    }

}
