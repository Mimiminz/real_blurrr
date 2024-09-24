package com.luckvicky.blur.domain.channelboard.service;

import static com.luckvicky.blur.global.constant.Number.HOT_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.HOT_DASHCAM_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.HOT_MYCAR_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.ZERO;

import com.luckvicky.blur.domain.board.repository.MyCarRepository;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotDashCamResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.HotBoardResponse;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.repository.DashcamRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.ClockUtil;
import com.luckvicky.blur.global.util.RandomUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {

    private final ChannelBoardRepository channelBoardRepository;
    private final DashcamRepository dashcamRepository;
    private final MyCarRepository myCarRepository;

    @Override
    public List<HotBoardResponse> getHotBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.LIKE.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        Page<ChannelBoard> boards = channelBoardRepository
                .findAllByAndStatusAndCreatedAtBetween(pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now);

        return boards.stream()
                .map(HotBoardResponse::of)
                .collect(Collectors.toList());

    }

    @Override
    public List<HotDashCamResponse> getHotDashcamBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_DASHCAM_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.VOTE.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        Page<DashCam> boards = dashcamRepository
                .findByStatusAndCreatedAtBetween(pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now);

        return boards.stream()
                .map(HotDashCamResponse::of)
                .collect(Collectors.toList());

    }

    @Override
    public TodayMyCarResponse getTodayMyCarBoard() {

        LocalDateTime now = ClockUtil.getLocalDateTime();
        System.out.println(now.minusDays(1).toLocalDate().atStartOfDay());
        System.out.println(now.plusDays(1).minusNanos(1));

        List<MyCarBoard> board = myCarRepository
                .findAllByStatusAndLikeCountGreaterThanEqualAndCreatedAtBetween(
                        Sort.by(Direction.DESC, SortingCriteria.LIKE.getCriteria()),
                        ActivateStatus.ACTIVE,
                        1L,
                        now.minusDays(1).toLocalDate().atStartOfDay(),
                        now.toLocalDate().atStartOfDay().minusNanos(1)
                );

        if (Objects.isNull(board) || board.isEmpty()) {
            return null;
        }

        return TodayMyCarResponse.of(
                board.get(RandomUtil.getRandomIndex(board.size()))
        );

    }

    @Override
    public List<HotMyCarResponse> getHotMyCarBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_MYCAR_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.VIEW.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        Page<MyCarBoard> boards = myCarRepository
                .findAllByStatusAndCreatedAtBetween(pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now);

        return boards.stream()
                .map(HotMyCarResponse::of)
                .collect(Collectors.toList());

    }

}
