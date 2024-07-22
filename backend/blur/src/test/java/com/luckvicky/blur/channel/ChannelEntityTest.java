package com.luckvicky.blur.channel;

import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import com.luckvicky.blur.domain.channel.model.entity.Channels;
import com.luckvicky.blur.domain.channel.model.entity.Tags;
import com.luckvicky.blur.domain.channel.repository.ChannelTagRepository;
import com.luckvicky.blur.domain.channel.repository.ChannelsRepository;
import com.luckvicky.blur.domain.channel.repository.TagsRepository;
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
    private ChannelsRepository channelsRepository;

    @Autowired
    private TagsRepository tagsRepository;

    @Autowired
    private ChannelTagRepository channelTagRepository;


    @Test
    public void testCreateAndRetrieveChannel(){
        UUID channelId = UUID.randomUUID();
        Channels channel = Channels.builder()
                .id(channelId)
                .name("Test Channel")
                .imgUrl("https://car.withnews.kr/wp-content/uploads/2024/04/Lamborghini-Revuelto-Special-Edition.jpg")
                .info("이것은 테스트입니다.")
                .owner(UUID.randomUUID())
                .build();

        channelsRepository.save(channel);

        entityManager.flush();

        Channels foundChannel = channelsRepository.findById(channelId).orElse(null);
        assertThat(foundChannel).isNotNull();
        assertThat(foundChannel.getName()).isEqualTo("Test Channel");
    }

    @Test
    public void testCreateAndRetrieveTag() {
        UUID tagId = UUID.randomUUID();
        Tags tag = new Tags(tagId, "TestTag");

        tagsRepository.save(tag);

        Tags foundTag = tagsRepository.findById(tagId).orElse(null);
        assertThat(foundTag).isNotNull();
        assertThat(foundTag.getName()).isEqualTo("TestTag");
    }

}
