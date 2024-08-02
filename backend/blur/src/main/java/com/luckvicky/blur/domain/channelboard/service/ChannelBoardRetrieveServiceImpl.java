package com.luckvicky.blur.domain.channelboard.service;

import static com.luckvicky.blur.global.constant.Number.HOT_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.HOT_DASHCAM_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.HOT_MYCAR_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.ZERO;

import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.repository.DashcamRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.ClockUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelBoardRetrieveServiceImpl implements ChannelBoardRetrieveService {

    private final ModelMapper mapper;
    private final ChannelBoardRepository channelBoardRepository;
    private final DashcamRepository dashcamRepository;

    @Override
    public List<HotBoardDto> getHotBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.LIKE.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        List<ChannelBoard> boards = channelBoardRepository
                .findAllByAndStatusAndCreatedAtBetween(pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now)
                .getContent();

        return boards.stream()
                .map(board -> mapper.map(board, HotBoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<HotDashcamDto> getHotDashcamBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_DASHCAM_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.VOTE.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        List<DashCam> boards = dashcamRepository
                .findByStatusAndCreatedAtBetween(pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now)
                .getContent();

        return boards.stream()
                .map(board -> mapper.map(board, HotDashcamDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public MyCarDto getTodayMyCarBoard() {

        LocalDateTime now = ClockUtil.getLocalDateTime();

        ChannelBoard board = channelBoardRepository
                .findByTypeAndStatusAndCreatedAtBetween(
                        BoardType.MYCAR,
                        Sort.by(Direction.DESC, SortingCriteria.LIKE.getCriteria()),
                        ActivateStatus.ACTIVE,
                        now.minusDays(1), now
                );

        if (Objects.isNull(board)) {
            return null;
        }

        return mapper.map(board, MyCarDto.class);

    }

    @Override
    public List<MyCarDto> getHotMyCarBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_MYCAR_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.VIEW.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        List<ChannelBoard> boards = channelBoardRepository
                .findAllByTypeAndStatusAndCreatedAtBetween(BoardType.MYCAR, pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now)
                .getContent();

        return boards.stream()
                .map(board -> mapper.map(board, MyCarDto.class))
                .collect(Collectors.toList());

    }

}
