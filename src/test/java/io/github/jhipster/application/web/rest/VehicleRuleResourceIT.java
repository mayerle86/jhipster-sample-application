package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;
import io.github.jhipster.application.config.TestSecurityConfiguration;
import io.github.jhipster.application.domain.VehicleRule;
import io.github.jhipster.application.repository.VehicleRuleRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;


import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VehicleRuleResource} REST controller.
 */
@SpringBootTest(classes = {JhipsterSampleApplicationApp.class, TestSecurityConfiguration.class})
public class VehicleRuleResourceIT {

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private VehicleRuleRepository vehicleRuleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restVehicleRuleMockMvc;

    private VehicleRule vehicleRule;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleRuleResource vehicleRuleResource = new VehicleRuleResource(vehicleRuleRepository);
        this.restVehicleRuleMockMvc = MockMvcBuilders.standaloneSetup(vehicleRuleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleRule createEntity() {
        VehicleRule vehicleRule = new VehicleRule()
            .key(DEFAULT_KEY)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .condition(DEFAULT_CONDITION)
            .comment(DEFAULT_COMMENT);
        return vehicleRule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VehicleRule createUpdatedEntity() {
        VehicleRule vehicleRule = new VehicleRule()
            .key(UPDATED_KEY)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .condition(UPDATED_CONDITION)
            .comment(UPDATED_COMMENT);
        return vehicleRule;
    }

    @BeforeEach
    public void initTest() {
        vehicleRuleRepository.deleteAll();
        vehicleRule = createEntity();
    }

    @Test
    public void createVehicleRule() throws Exception {
        int databaseSizeBeforeCreate = vehicleRuleRepository.findAll().size();

        // Create the VehicleRule
        restVehicleRuleMockMvc.perform(post("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleRule)))
            .andExpect(status().isCreated());

        // Validate the VehicleRule in the database
        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleRule testVehicleRule = vehicleRuleList.get(vehicleRuleList.size() - 1);
        assertThat(testVehicleRule.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testVehicleRule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleRule.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVehicleRule.getCondition()).isEqualTo(DEFAULT_CONDITION);
        assertThat(testVehicleRule.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    public void createVehicleRuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleRuleRepository.findAll().size();

        // Create the VehicleRule with an existing ID
        vehicleRule.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleRuleMockMvc.perform(post("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleRule)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleRule in the database
        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkKeyIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleRuleRepository.findAll().size();
        // set the field null
        vehicleRule.setKey(null);

        // Create the VehicleRule, which fails.

        restVehicleRuleMockMvc.perform(post("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleRule)))
            .andExpect(status().isBadRequest());

        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleRuleRepository.findAll().size();
        // set the field null
        vehicleRule.setName(null);

        // Create the VehicleRule, which fails.

        restVehicleRuleMockMvc.perform(post("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleRule)))
            .andExpect(status().isBadRequest());

        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllVehicleRules() throws Exception {
        // Initialize the database
        vehicleRuleRepository.save(vehicleRule);

        // Get all the vehicleRuleList
        restVehicleRuleMockMvc.perform(get("/api/vehicle-rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleRule.getId())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].condition").value(hasItem(DEFAULT_CONDITION.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    public void getVehicleRule() throws Exception {
        // Initialize the database
        vehicleRuleRepository.save(vehicleRule);

        // Get the vehicleRule
        restVehicleRuleMockMvc.perform(get("/api/vehicle-rules/{id}", vehicleRule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleRule.getId()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.condition").value(DEFAULT_CONDITION.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    public void getNonExistingVehicleRule() throws Exception {
        // Get the vehicleRule
        restVehicleRuleMockMvc.perform(get("/api/vehicle-rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateVehicleRule() throws Exception {
        // Initialize the database
        vehicleRuleRepository.save(vehicleRule);

        int databaseSizeBeforeUpdate = vehicleRuleRepository.findAll().size();

        // Update the vehicleRule
        VehicleRule updatedVehicleRule = vehicleRuleRepository.findById(vehicleRule.getId()).get();
        updatedVehicleRule
            .key(UPDATED_KEY)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .condition(UPDATED_CONDITION)
            .comment(UPDATED_COMMENT);

        restVehicleRuleMockMvc.perform(put("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleRule)))
            .andExpect(status().isOk());

        // Validate the VehicleRule in the database
        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeUpdate);
        VehicleRule testVehicleRule = vehicleRuleList.get(vehicleRuleList.size() - 1);
        assertThat(testVehicleRule.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testVehicleRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleRule.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVehicleRule.getCondition()).isEqualTo(UPDATED_CONDITION);
        assertThat(testVehicleRule.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    public void updateNonExistingVehicleRule() throws Exception {
        int databaseSizeBeforeUpdate = vehicleRuleRepository.findAll().size();

        // Create the VehicleRule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVehicleRuleMockMvc.perform(put("/api/vehicle-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleRule)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleRule in the database
        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteVehicleRule() throws Exception {
        // Initialize the database
        vehicleRuleRepository.save(vehicleRule);

        int databaseSizeBeforeDelete = vehicleRuleRepository.findAll().size();

        // Delete the vehicleRule
        restVehicleRuleMockMvc.perform(delete("/api/vehicle-rules/{id}", vehicleRule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VehicleRule> vehicleRuleList = vehicleRuleRepository.findAll();
        assertThat(vehicleRuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleRule.class);
        VehicleRule vehicleRule1 = new VehicleRule();
        vehicleRule1.setId("id1");
        VehicleRule vehicleRule2 = new VehicleRule();
        vehicleRule2.setId(vehicleRule1.getId());
        assertThat(vehicleRule1).isEqualTo(vehicleRule2);
        vehicleRule2.setId("id2");
        assertThat(vehicleRule1).isNotEqualTo(vehicleRule2);
        vehicleRule1.setId(null);
        assertThat(vehicleRule1).isNotEqualTo(vehicleRule2);
    }
}
