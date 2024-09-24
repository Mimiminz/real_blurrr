package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.board.factory.entity.BoardFactory;
import com.luckvicky.blur.domain.league.factory.LeagueFactory;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.leaguemember.exception.NotAllocatedLeagueException;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.like.exception.FailToCreateLikeException;
import com.luckvicky.blur.domain.like.exception.FailToDeleteLikeException;
import com.luckvicky.blur.domain.like.factory.LikeFactory;
import com.luckvicky.blur.domain.like.model.dto.response.LikeCreateResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeDeleteResponse;
import com.luckvicky.blur.domain.like.model.entity.Like;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.strategy.MemberFactory;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.Optional;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.assertj.core.data.Offset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
@DisplayName("[좋아요 관련 비즈니스 로직 테스트]")
public class LeagueLikeServiceImplTest {

    @InjectMocks
    private LeagueLikeServiceImpl leagueLikeService;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private LeagueMemberRepository leagueMemberRepository;

    @Mock
    private LeagueBoardRepository leagueBoardRepository;

    private Member member;
    private LeagueBoard board;
    private League league;
    private Like like;

    @BeforeEach
    void setUp() {

        board = BoardFactory.createLeagueBoard();
        member = MemberFactory.createMember();
        league = LeagueFactory.createBrandLeague();
        like = LikeFactory.createLike(member, board);

        ReflectionTestUtils.setField(board, "member", member);
        ReflectionTestUtils.setField(board, "league", league);

        given(memberRepository.getOrThrow(member.getId()))
                .willReturn(member);

        given(leagueMemberRepository.existsByLeagueAndMember(board.getLeague(), member))
                .willReturn(Boolean.TRUE);

        given(leagueBoardRepository.getOrThrow(board.getId()))
                .willReturn(board);

    }

    @Test
    @DisplayName("[좋아요 생성]")
    void createLike() {

        given(likeRepository.save(any()))
                .willReturn(LikeFactory.createLike(member, board));

        given(likeRepository.existsByMemberAndBoard(member, board))
                .willReturn(Boolean.TRUE);

        LikeCreateResponse response = leagueLikeService.createLike(member.getId(), board.getId());

        assertThat(response).isNotNull();
        assertThat(response.likeCount()).isEqualTo(board.getLikeCount());
        assertThat(response.isLike()).isTrue();

    }

    @Test
    @DisplayName("[좋아요 생성 실패]")
    void FailToCreateLike() {

        given(likeRepository.save(any()))
                .willReturn(LikeFactory.createLike(member, board));

        given(likeRepository.existsByMemberAndBoard(member, board))
                .willReturn(Boolean.FALSE);

        assertThatThrownBy(() -> leagueLikeService.createLike(member.getId(), board.getId()))
                .isInstanceOf(FailToCreateLikeException.class);

    }

    @Test
    @DisplayName("[좋아요 삭제]")
    void deleteLike() {

        given(likeRepository.findByMemberAndBoard(member, board))
                .willReturn(Optional.ofNullable(like));

        doNothing().when(likeRepository).deleteById(like.getId());

        given(likeRepository.existsByMemberAndBoard(member, board))
                .willReturn(Boolean.FALSE);

        LikeDeleteResponse response = leagueLikeService.deleteLike(member.getId(), board.getId());

        assertThat(response).isNotNull();
        assertThat(response.likeCount()).isEqualTo(board.getLikeCount());
        assertThat(response.isLike()).isFalse();

    }

    @Test
    @DisplayName("[좋아요 삭제 실패]")
    void FailToDeleteLike() {

        given(likeRepository.findByMemberAndBoard(member, board))
                .willReturn(Optional.ofNullable(like));

        doNothing().when(likeRepository).deleteById(like.getId());

        given(likeRepository.existsByMemberAndBoard(member, board))
                .willReturn(Boolean.TRUE);

        assertThatThrownBy(() -> leagueLikeService.deleteLike(member.getId(), board.getId()))
                .isInstanceOf(FailToDeleteLikeException.class);

    }


    @Test
    @DisplayName("[할당되지 않은 리그 게시글에 대한 좋아요]")
    void isAllocatedLeague() {

        given(leagueMemberRepository.existsByLeagueAndMember(league, member))
                .willReturn(false);

        assertThatThrownBy(() -> leagueLikeService.createLike(member.getId(), board.getId()))
                .isInstanceOf(NotAllocatedLeagueException.class);

    }

    @Test
    @DisplayName("[분산락 적용에 대한 동시성]")
    void distributedLock() throws InterruptedException {

        Long beforeLikeCount = board.getLikeCount();
        int numberOfThreads = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);

        given(leagueMemberRepository.existsByLeagueAndMember(board.getLeague(), member))
                .willReturn(Boolean.TRUE);

        given(likeRepository.save(any()))
                .willReturn(LikeFactory.createLike(member, board));

        given(likeRepository.existsByMemberAndBoard(member, board))
                .willReturn(Boolean.TRUE);

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.submit(() -> {
                try {
                    leagueLikeService.createLike(member.getId(), board.getId());
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        LeagueBoard leagueBoard = leagueBoardRepository.getOrThrow(board.getId());
        assertThat(leagueBoard.getLikeCount()).isCloseTo(beforeLikeCount + numberOfThreads, Offset.offset(1L));

    }

}
