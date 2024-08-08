package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_CONTENT;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_NICKNAME;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_TITLE;

import com.luckvicky.blur.domain.board.exception.InValidSearchConditionException;
import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.global.enums.filter.SearchCondition;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeagueBoardSearchServiceImpl implements LeagueBoardSearchService {

    private final LeagueRepository leagueRepository;
    private final LeagueBoardRepository leagueBoardRepository;

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueBoardResponse> search(
            UUID leagueId,
            String leagueType,
            String keyword,
            String condition,
            int pageNumber,
            String criteria
    ) {

        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        SearchCondition searchCondition = SearchCondition.convertToEnum(condition);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Page<LeagueBoard> paginatedResult;
        switch (searchCondition.getCondition()) {

            case CONDITION_TITLE ->
                    paginatedResult = leagueBoardRepository
                            .findAllByLeagueAndTitleContainingIgnoreCase(league, keyword.toLowerCase(), pageable);
            case CONDITION_CONTENT ->
                    paginatedResult = leagueBoardRepository
                            .findAllByLeagueAndContentContainingIgnoreCase(league, keyword.toLowerCase(), pageable);
            case CONDITION_NICKNAME ->
                    paginatedResult = leagueBoardRepository
                            .findAllByLeagueAndMemberNicknameContainingIgnoreCase(league, keyword.toLowerCase(), pageable);

            default -> throw new InValidSearchConditionException();

        }

        return PaginatedResponse.of(
                paginatedResult.getNumber(),
                paginatedResult.getSize(),
                paginatedResult.getTotalElements(),
                paginatedResult.getTotalPages(),
                paginatedResult.getContent().stream()
                        .map(LeagueBoardResponse::of)
                        .collect(Collectors.toList())
        );

    }

    private static void isEqualLeagueType(LeagueType leagueType, LeagueType findLeagueType) {
        if (!leagueType.equals(findLeagueType)) {
            throw new InvalidLeagueTypeException();
        }
    }


}
