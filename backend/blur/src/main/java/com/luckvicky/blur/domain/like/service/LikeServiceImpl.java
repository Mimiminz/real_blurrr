package com.luckvicky.blur.domain.like.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.like.exception.FailToDeleteLikeException;
import com.luckvicky.blur.domain.like.exception.NotExistLikeException;
import com.luckvicky.blur.domain.like.model.dto.response.LikeCreateResponse;
import com.luckvicky.blur.domain.like.model.dto.response.LikeDeleteResponse;
import com.luckvicky.blur.domain.like.model.entity.Like;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.infra.redisson.DistributedLock;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    @Override
    @DistributedLock(value = "#boardId")
    public LikeCreateResponse createLike(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.getOrThrow(boardId);

        likeRepository.save(
                Like.builder()
                        .member(member)
                        .board(board)
                        .build()
        );

        Boolean isLike = isLike(member, board);
        if (!isLike) {
            throw new FailToDeleteLikeException();
        }

        board.increaseLikeCount();
        return LikeCreateResponse.of(board.getLikeCount(), isLike(member, board));

    }

    @Override
    @DistributedLock(value = "#boardId")
    public LikeDeleteResponse deleteLike(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.findByIdForUpdate(boardId)
                .orElseThrow(NotExistBoardException::new);

        Like findLike = likeRepository.findByMemberAndBoard(member, board)
                .orElseThrow(NotExistLikeException::new);

        likeRepository.deleteById(findLike.getId());

        Boolean isLike = isLike(member, board);
        if (isLike) {
            throw new FailToDeleteLikeException();
        }

        board.decreaseLikeCount();
        return LikeDeleteResponse.of(board.getLikeCount(), isLike);

    }

    private Boolean isLike(Member member, Board board) {
        return likeRepository.existsByMemberAndBoard(member, board);
    }

}
