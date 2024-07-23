package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.dashcamboard.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashcamBoardServiceImpl implements DashcamBoardService{

    private final DashcamRepository dashcamRepository;
    private final DashcamBoardMapper dashcamBoardMapper;

    @Override
    public List<DashcamBoardListDto> getDashcamBoards() {
        List<Dashcam> dashcams = dashcamRepository.findAll();
        return dashcamBoardMapper.toDashcamBoardListDtos(dashcams);
    }
}
