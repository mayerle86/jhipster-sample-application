package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.VehicleRule;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the VehicleRule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleRuleRepository extends MongoRepository<VehicleRule, String> {

}
