package com.luckvicky.blur.domain.like.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.like.exception.FailToCreateLikeException;
import com.luckvicky.blur.domain.like.exception.FailToDeleteLikeException;
import com.luckvicky.blur.domain.like.exception.NotExistLikeException;
import com.luckvicky.blur.domain.like.model.entity.Like;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.infra.redisson.DistributedLock;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final ModelMapper mapper;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    @Override
    public Boolean createLike(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.getOrThrow(boardId);

        increaseLikeCount(board);

        Like createdLike = likeRepository.save(
                Like.builder()
                        .member(member)
                        .board(board)
                        .build()
        );

        return isCreated(createdLike);
    }

    @Override
    public Boolean deleteLike(UUID memberId, UUID boardId) {

        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.findByIdForUpdate(boardId)
                .orElseThrow(NotExistBoardException::new);

        decreaseLikeCount(board);

        Like findLike = likeRepository.findByMemberAndBoard(member, board)
                .orElseThrow(NotExistLikeException::new);

        likeRepository.deleteById(findLike.getId());
        boardRepository.save(board);

        return isDeleted(findLike);

    }

    @DistributedLock(value = "#boardId")
    private static void increaseLikeCount(Board board) {
        board.increaseLikeCount();
    }

    @DistributedLock(value = "#boardId")
    private static void decreaseLikeCount(Board board) {
        board.decreaseLikeCount();
    }

    private Boolean isCreated(Like createdLike) {

        likeRepository.findById(createdLike.getId())
                .orElseThrow(FailToCreateLikeException::new);

        return true;

    }

    private Boolean isDeleted(Like findLike) {

        if (likeRepository.existsById(findLike.getId()))  {
            throw new FailToDeleteLikeException();
        }

        return true;

    }

}
