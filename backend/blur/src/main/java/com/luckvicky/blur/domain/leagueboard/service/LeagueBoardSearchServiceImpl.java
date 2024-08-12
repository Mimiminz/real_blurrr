package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;

import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
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
    private final RedisViewCounterService redisViewCounterService;

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LeagueBoardResponse> search(
            UUID leagueId, String leagueType, String keyword, int pageNumber, String criteria
    ) {

        League league = leagueRepository.getOrThrow(leagueId);

        isEqualLeagueType(LeagueType.convertToEnum(leagueType), league.getType());

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Page<LeagueBoard> paginatedResult = leagueBoardRepository
                .findAllByLeagueAndStatusAndTitleContainingIgnoreCase(league, ActivateStatus.ACTIVE, keyword, pageable);

        return PaginatedResponse.of(
                paginatedResult.getNumber(),
                paginatedResult.getSize(),
                paginatedResult.getTotalElements(),
                paginatedResult.getTotalPages(),
                paginatedResult.getContent().stream()
                        .map(lb ->
                                LeagueBoardResponse.of(
                                        lb,
                                        redisViewCounterService.addViewCountInRedis(lb.getId(), lb.getViewCount())
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    private static void isEqualLeagueType(LeagueType leagueType, LeagueType findLeagueType) {
        if (!leagueType.equals(findLeagueType)) {
            throw new InvalidLeagueTypeException();
        }
    }


}
