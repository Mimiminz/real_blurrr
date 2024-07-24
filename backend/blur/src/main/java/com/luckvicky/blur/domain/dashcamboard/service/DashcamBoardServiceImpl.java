package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.dashcamboard.exception.DashcamNotFoundException;
import com.luckvicky.blur.domain.dashcamboard.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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

    @Override
    public DashcamBoardDto getDashcamBoardById(UUID id) {
        Dashcam dashcam = dashcamRepository.findById(id)
                .orElseThrow(DashcamNotFoundException::new);
        return dashcamBoardMapper.toDashcamBoardDto(dashcam);
    }
}
