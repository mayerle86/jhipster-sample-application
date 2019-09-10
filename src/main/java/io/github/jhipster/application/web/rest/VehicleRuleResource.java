package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.VehicleRule;
import io.github.jhipster.application.repository.VehicleRuleRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.VehicleRule}.
 */
@RestController
@RequestMapping("/api")
public class VehicleRuleResource {

    private final Logger log = LoggerFactory.getLogger(VehicleRuleResource.class);

    private static final String ENTITY_NAME = "vehicleRule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleRuleRepository vehicleRuleRepository;

    public VehicleRuleResource(VehicleRuleRepository vehicleRuleRepository) {
        this.vehicleRuleRepository = vehicleRuleRepository;
    }

    /**
     * {@code POST  /vehicle-rules} : Create a new vehicleRule.
     *
     * @param vehicleRule the vehicleRule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleRule, or with status {@code 400 (Bad Request)} if the vehicleRule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vehicle-rules")
    public ResponseEntity<VehicleRule> createVehicleRule(@Valid @RequestBody VehicleRule vehicleRule) throws URISyntaxException {
        log.debug("REST request to save VehicleRule : {}", vehicleRule);
        if (vehicleRule.getId() != null) {
            throw new BadRequestAlertException("A new vehicleRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleRule result = vehicleRuleRepository.save(vehicleRule);
        return ResponseEntity.created(new URI("/api/vehicle-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vehicle-rules} : Updates an existing vehicleRule.
     *
     * @param vehicleRule the vehicleRule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleRule,
     * or with status {@code 400 (Bad Request)} if the vehicleRule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleRule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vehicle-rules")
    public ResponseEntity<VehicleRule> updateVehicleRule(@Valid @RequestBody VehicleRule vehicleRule) throws URISyntaxException {
        log.debug("REST request to update VehicleRule : {}", vehicleRule);
        if (vehicleRule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehicleRule result = vehicleRuleRepository.save(vehicleRule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vehicleRule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vehicle-rules} : get all the vehicleRules.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleRules in body.
     */
    @GetMapping("/vehicle-rules")
    public List<VehicleRule> getAllVehicleRules() {
        log.debug("REST request to get all VehicleRules");
        return vehicleRuleRepository.findAll();
    }

    /**
     * {@code GET  /vehicle-rules/:id} : get the "id" vehicleRule.
     *
     * @param id the id of the vehicleRule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleRule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vehicle-rules/{id}")
    public ResponseEntity<VehicleRule> getVehicleRule(@PathVariable String id) {
        log.debug("REST request to get VehicleRule : {}", id);
        Optional<VehicleRule> vehicleRule = vehicleRuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicleRule);
    }

    /**
     * {@code DELETE  /vehicle-rules/:id} : delete the "id" vehicleRule.
     *
     * @param id the id of the vehicleRule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vehicle-rules/{id}")
    public ResponseEntity<Void> deleteVehicleRule(@PathVariable String id) {
        log.debug("REST request to delete VehicleRule : {}", id);
        vehicleRuleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
