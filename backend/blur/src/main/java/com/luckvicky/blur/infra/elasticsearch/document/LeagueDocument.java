package com.luckvicky.blur.infra.elasticsearch.document;

import com.luckvicky.blur.domain.league.model.entity.League;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setting(settingPath = "/elastic/elastic-setting.json")
@Mapping(mappingPath = "/elastic/league-mapping.json")
@Document(indexName = "league")
public class LeagueDocument {

    @Id
    private UUID id;

    private String name;

    private Long peopleCount;

    public static LeagueDocument of(League league) {
        return LeagueDocument.builder()
                .id(league.getId())
                .name(league.getName())
                .peopleCount(league.getPeopleCount())
                .build();
    }

}
