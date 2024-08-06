package com.luckvicky.blur.global.config;

import com.luckvicky.blur.domain.board.factory.BoardFactory;
import com.luckvicky.blur.domain.board.factory.MyCarBoardFactory;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import java.util.HashMap;
import java.util.Map;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BoardFactoryConfig {

    @Bean
    public Map<BoardType, BoardFactory> boardFactoryMap() {
        HashMap<BoardType, BoardFactory> factoryHashMap = new HashMap<>();

        factoryHashMap.put(BoardType.MYCAR, new MyCarBoardFactory());

        return factoryHashMap;
    }
}
