package com.luckvicky.blur.infra.elasticsearch.repository;

import java.util.UUID;
import com.luckvicky.blur.infra.elasticsearch.document.LeagueDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueElasticSearchRepository extends ElasticsearchRepository<LeagueDocument, UUID> {

    Page<LeagueDocument> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

}
