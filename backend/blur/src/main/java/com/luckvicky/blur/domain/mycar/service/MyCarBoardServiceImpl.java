package com.luckvicky.blur.domain.mycar.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.factory.BoardFactory;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.MyCarRepository;
import com.luckvicky.blur.domain.channel.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.dashcam.exception.NotFoundDashcamException;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.mycar.model.resp.MyCarDetail;
import com.luckvicky.blur.domain.mycar.model.resp.MyCarSimple;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MyCarBoardServiceImpl implements MyCarBoardService {
    private final MyCarRepository myCarRepository;
    private final Map<BoardType, BoardFactory> factoryMap;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;
    private final LikeRepository likeRepository;


    public MyCarBoardServiceImpl(MyCarRepository myCarRepository, Map<BoardType, BoardFactory> factoryMap,
                                 MemberRepository memberRepository, ChannelRepository channelRepository,
                                 LikeRepository likeRepository) {
        this.myCarRepository = myCarRepository;
        this.factoryMap = factoryMap;
        this.memberRepository = memberRepository;
        this.channelRepository = channelRepository;
        this.likeRepository = likeRepository;
    }

    @Override
    public Page<MyCarSimple> findMyCars(Pageable page) {
        Channel channel = channelRepository
                .findByNameIs(BoardType.MYCAR.getName())
                .orElseThrow(NotExistChannelException::new);
        return myCarRepository.findAllByChannel(channel, page).map(MyCarSimple::of);
    }

    @Transactional
    @Override
    public Boolean createMyCarBoard(BoardCreateRequest request, UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        BoardType boardType = BoardType.convertToEnum(request.getBoardType());

        MyCarBoard createdBoard = (MyCarBoard) factoryMap.get(boardType).createBoard(request, member);

        Channel channel = channelRepository
                .findByNameIs(boardType.getName())
                .orElseThrow(NotExistChannelException::new);

        createdBoard.setChannel(channel);
        myCarRepository.save(createdBoard);

        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public MyCarDetail findMyCarDetail(UUID boardId, ContextMember nullableMember) {
        MyCarBoard myCarBoard = myCarRepository.findById(boardId)
                .orElseThrow(NotExistBoardException::new);

        myCarBoard.increaseViewCount();

        boolean isLiked = false;
        if(Objects.nonNull(nullableMember)){
            isLiked = isLike(nullableMember.getId(), myCarBoard);
        }

        return MyCarDetail.of(myCarBoard, isLiked);
    }

    private boolean isLike(UUID memberId, Board board) {
        var member = memberRepository.getOrThrow(memberId);
        return likeRepository.existsByMemberAndBoard(member, board);
    }
}
