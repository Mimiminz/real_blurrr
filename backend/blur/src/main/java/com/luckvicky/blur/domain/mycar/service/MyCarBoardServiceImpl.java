package com.luckvicky.blur.domain.mycar.service;

import com.luckvicky.blur.domain.board.factory.BoardFactory;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.MyCarRepository;
import com.luckvicky.blur.domain.channel.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.mycar.model.resp.SimpleMyCar;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MyCarBoardServiceImpl implements MyCarBoardService {
    private final MyCarRepository myCarRepository;
    private final Map<BoardType, BoardFactory> factoryMap;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;

    public MyCarBoardServiceImpl(MyCarRepository myCarRepository, Map<BoardType, BoardFactory> factoryMap,
                                 MemberRepository memberRepository, ChannelRepository channelRepository) {
        this.myCarRepository = myCarRepository;
        this.factoryMap = factoryMap;
        this.memberRepository = memberRepository;
        this.channelRepository = channelRepository;
    }

    @Override
    public Slice<SimpleMyCar> findMyCars(Pageable page) {
        Channel channel = channelRepository
                .findByNameIs(BoardType.MYCAR.getName())
                .orElseThrow(NotExistChannelException::new);

        return myCarRepository.findAllByChannel(channel, page).map(SimpleMyCar::of);
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


}
