package com.luckvicky.blur.channel;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelTagRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.channel.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ChannelEntityTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ChannelTagRepository channelTagRepository;


    @Test
    public void testCreateAndRetrieveChannel(){
        UUID channelId = UUID.randomUUID();
        Channel channel = Channel.builder()
                .name("Test Channel")
                .imgUrl("https://car.withnews.kr/wp-content/uploads/2024/04/Lamborghini-Revuelto-Special-Edition.jpg")
                .info("이것은 테스트입니다.")
                .build();

        Channel savedChannel = channelRepository.save(channel);

        entityManager.flush();

        Channel foundChannel = channelRepository.findById(savedChannel.getId()).orElse(null);
        assertThat(foundChannel).isNotNull();
        assertThat(foundChannel.getName()).isEqualTo("Test Channel");
    }


}
