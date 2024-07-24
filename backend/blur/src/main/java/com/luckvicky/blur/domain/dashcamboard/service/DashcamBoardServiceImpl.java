package com.luckvicky.blur.domain.dashcamboard.service;

import com.luckvicky.blur.domain.dashcamboard.exception.DashcamNotFoundException;
import com.luckvicky.blur.domain.dashcamboard.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcamboard.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcamboard.model.entity.Dashcam;
import com.luckvicky.blur.domain.dashcamboard.model.entity.DashcamMention;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamMentionRepository;
import com.luckvicky.blur.domain.dashcamboard.repository.DashcamRepository;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.member.exception.UserNotFoundException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashcamBoardServiceImpl implements DashcamBoardService{

    private final DashcamRepository dashcamRepository;
    private final DashcamBoardMapper dashcamBoardMapper;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final DashcamMentionRepository dashcamMentionRepository;

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

    @Override
    @Transactional
    public DashcamBoardDto createDashcamBoard(DashcamBoardCreateRequest request) {
        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(UserNotFoundException::new);

        Dashcam dashcam = request.toEntity(member);
        dashcam = dashcamRepository.save(dashcam);


        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());
        for (League league : mentionedLeagues) {
            DashcamMention mention = DashcamMention.builder()
                    .dashcam(dashcam)
                    .league(league)
                    .build();
            dashcamMentionRepository.save(mention);
        }

        return dashcamBoardMapper.toDashcamBoardDto(dashcam);
    }
}
