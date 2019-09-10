/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VehicleRuleComponent } from 'app/entities/vehicle-rule/vehicle-rule.component';
import { VehicleRuleService } from 'app/entities/vehicle-rule/vehicle-rule.service';
import { VehicleRule } from 'app/shared/model/vehicle-rule.model';

describe('Component Tests', () => {
  describe('VehicleRule Management Component', () => {
    let comp: VehicleRuleComponent;
    let fixture: ComponentFixture<VehicleRuleComponent>;
    let service: VehicleRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VehicleRuleComponent],
        providers: []
      })
        .overrideTemplate(VehicleRuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VehicleRuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VehicleRuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new VehicleRule('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vehicleRules[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
