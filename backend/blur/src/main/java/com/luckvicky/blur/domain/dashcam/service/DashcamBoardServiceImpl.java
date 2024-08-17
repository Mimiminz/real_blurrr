package com.luckvicky.blur.domain.dashcam.service;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.service.RedisViewCounterService;
import com.luckvicky.blur.domain.channel.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import com.luckvicky.blur.domain.channelboard.repository.MentionRepository;
import com.luckvicky.blur.domain.dashcam.exception.FailToCreateThumbnail;
import com.luckvicky.blur.domain.dashcam.exception.NotFoundDashcamException;
import com.luckvicky.blur.domain.dashcam.mapper.DashcamBoardMapper;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.dto.request.VideoCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.dto.response.DashcamBoardCreateResponse;
import com.luckvicky.blur.domain.dashcam.model.entity.Video;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.vote.model.dto.request.OptionCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.repository.DashcamRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.vote.model.entity.Option;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.luckvicky.blur.global.constant.Number.DASHCAM_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.StringFormat.THUMBNAIL;
import static com.luckvicky.blur.global.constant.StringFormat.THUMBNAIL_BUCKET;
import static com.luckvicky.blur.global.constant.StringFormat.THUMBNAIL_EXTENSION;
import static com.luckvicky.blur.global.constant.StringFormat.VIDEO_BUCKET;

@Service
@RequiredArgsConstructor
public class DashcamBoardServiceImpl implements DashcamBoardService{

    private final RedisViewCounterService redisViewCounterService;
    private final MemberRepository memberRepository;
    private final DashcamRepository dashcamRepository;
    private final DashcamBoardMapper dashcamBoardMapper;
    private final LeagueRepository leagueRepository;
    private final MentionRepository mentionRepository;
    private final ChannelRepository channelRepository;
    private final LikeRepository likeRepository;


    @Override
    @Transactional
    public DashcamBoardCreateResponse createDashcamBoard(DashcamBoardCreateRequest request, UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);

        Channel dashcamChannel = channelRepository
                .findByNameIs(BoardType.DASHCAM.getName())
                .orElseThrow(NotExistChannelException::new);

        DashCam dashcam = request.toEntity(dashcamChannel, member);

        if (!request.options().isEmpty()) {
            dashcam.setOption(createOption(request.options(), dashcam));
        }

        if (!request.videos().isEmpty()) {
            dashcam.setVideos(createVideo(request.videos(), dashcam));
            dashcam.setThumbnail(convertToThumbnailUrl(request.videos().get(0).videoUrl()));
        }

        List<League> mentionedLeagues = leagueRepository.findAllByNameIn(request.mentionedLeagueNames());

        if(mentionedLeagues.size() != request.mentionedLeagueNames().size()){
            throw new NotExistLeagueException();
        }

        for (League league : mentionedLeagues) {
            mentionRepository.save(Mention.builder()
                    .board(dashcam)
                    .league(league)
                    .build()
            );
        }

        dashcamRepository.save(dashcam);
        return DashcamBoardCreateResponse.of(dashcam.getId());

    }

    private String convertToThumbnailUrl(String videoUrl) {

        String thumbnailUrl = videoUrl.replace(VIDEO_BUCKET, THUMBNAIL_BUCKET);
        int extensionIndex = thumbnailUrl.lastIndexOf(".");

        if (extensionIndex == -1) {
            throw new FailToCreateThumbnail();
        }

        return thumbnailUrl.substring(0, extensionIndex) + THUMBNAIL + THUMBNAIL_EXTENSION;

    }

    private List<Option> createOption(List<OptionCreateRequest> requests, DashCam dashCam) {

        List<Option> options = new ArrayList<>();

        for (OptionCreateRequest optionRequest : requests) {
            options.add(
                    Option.builder()
                            .dashCam(dashCam)
                            .optionOrder(optionRequest.optionOrder())
                            .content(optionRequest.content())
                            .build()
            );
        }

        return options;

    }

    private List<Video> createVideo(List<VideoCreateRequest> requests, DashCam dashCam) {

        List<Video> videos = new ArrayList<>();

        for (VideoCreateRequest videoRequest : requests) {
            videos.add(
                    Video.builder()
                            .dashCam(dashCam)
                            .videoOrder(videoRequest.videoOrder())
                            .videoUrl(videoRequest.videoUrl())
                            .build()
            );
        }

        return videos;

    }


    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<DashcamBoardListDto> getDashcamBoards(String keyword, int pageNumber, String criteria) {

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        Pageable pageable = PageRequest.of(
                pageNumber, DASHCAM_BOARD_PAGE_SIZE,
                Sort.by(Sort.Direction.DESC, sortingCriteria.getCriteria())
        );

        Page<DashCam> dashCamBoardPage;

        if(keyword==null || keyword.trim().isEmpty()){
            dashCamBoardPage = dashcamRepository.findAllByStatus(ActivateStatus.ACTIVE, pageable);
        } else {
            dashCamBoardPage = dashcamRepository.findAllByStatusAndTitleContainingOrContentContaining(
                    ActivateStatus.ACTIVE,
                    keyword,
                    keyword,
                    pageable
            );
        }

        List<DashCam> dashCamBoards = dashCamBoardPage.getContent();
        List<DashcamBoardListDto> dashcamBoardListDtos = dashcamBoardMapper.toDashcamBoardListDtos(dashCamBoards);

        return PaginatedResponse.of(
                dashCamBoardPage.getNumber(),
                dashCamBoardPage.getSize(),
                dashCamBoardPage.getTotalElements(),
                dashCamBoardPage.getTotalPages(),
                dashcamBoardListDtos
        );
    }

    @Override
    @Transactional(readOnly = true)
    public DashcamBoardDetailDto getDashcamBoardById(UUID id, ContextMember nullableMember) {

        DashCam dashcam = dashcamRepository.findById(id)
                .orElseThrow(NotFoundDashcamException::new);

        boolean isLiked = false;
        if(Objects.nonNull(nullableMember)){
            isLiked = isLike(nullableMember.getId(),dashcam);
        }

        return dashcamBoardMapper.toDashcamBoardDetailDto(
                dashcam,
                dashcam.getViewCount() + redisViewCounterService.increment(dashcam.getId()),
                isLiked);
    }

    private boolean isLike(UUID memberId, Board board) {
        var member = memberRepository.getOrThrow(memberId);
        return likeRepository.existsByMemberAndBoard(member, board);
    }

}
