package com.luckvicky.blur.domain.mycar.service;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.repository.MyCarRepository;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.mycar.model.resp.MyCarDetail;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class MyCarBoardServiceImplTest {
    @Autowired
    MyCarBoardService myCarBoardService;

    @Autowired
    MyCarRepository myCarRepository;

//    @Test
//    void increaseView() {
//        UUID id = UUID.fromString("11ef59e2-7072-b011-bfed-835e2b9746c0");
//        System.out.println(id);
//        MyCarDetail myCarBoard = myCarBoardService.findMyCarDetail(id, null);
//        myCarBoardService.increaseView(UUID.fromString("11ef59e2-7072-b011-bfed-835e2b9746c0"));
//        assertEquals(myCarBoard.getId(), UUID.fromString("11ef59e2-7072-b011-bfed-835e2b9746c0".toUpperCase()));
//    }
}
