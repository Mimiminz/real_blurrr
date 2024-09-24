package com.luckvicky.blur.infra.elasticsearch.service;

import static com.luckvicky.blur.global.constant.Number.MENTION_LEAGUE_SEARCH_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.ZERO;

import com.luckvicky.blur.domain.league.model.dto.response.LeagueSearchResponse;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.util.LetterExtractUtil;
import com.luckvicky.blur.infra.elasticsearch.document.LeagueDocument;
import com.luckvicky.blur.infra.elasticsearch.repository.LeagueElasticSearchRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LeagueElasticSearchServiceImpl implements LeagueElasticSearchService {

    private final LeagueRepository leagueRepository;
    private final LeagueElasticSearchRepository leagueElasticSearchRepository;

    @Override
    public void save() {

        List<League> leagues = leagueRepository.findAll();

        leagueElasticSearchRepository.saveAll(
                leagues.stream()
                        .map(LeagueDocument::of)
                        .collect(Collectors.toList())
        );

    }

    @Override
    public PaginatedResponse<LeagueSearchResponse> searchLeagueByName(String name) {

        Pageable pageable = PageRequest.of(
                ZERO,
                MENTION_LEAGUE_SEARCH_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.PEOPLE.getCriteria())
        );

        Page<LeagueDocument> leagues =
                leagueElasticSearchRepository.findAllByNameContainingIgnoreCase(
                        LetterExtractUtil.extract(name), pageable
                );

        return PaginatedResponse.of(
                leagues.getNumber(),
                leagues.getSize(),
                leagues.getTotalElements(),
                leagues.getTotalPages(),
                leagues.stream()
                        .map(LeagueSearchResponse::of)
                        .collect(Collectors.toList())
        );

    }

}
