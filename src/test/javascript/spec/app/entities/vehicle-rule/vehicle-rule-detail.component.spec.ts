/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VehicleRuleDetailComponent } from 'app/entities/vehicle-rule/vehicle-rule-detail.component';
import { VehicleRule } from 'app/shared/model/vehicle-rule.model';

describe('Component Tests', () => {
  describe('VehicleRule Management Detail Component', () => {
    let comp: VehicleRuleDetailComponent;
    let fixture: ComponentFixture<VehicleRuleDetailComponent>;
    const route = ({ data: of({ vehicleRule: new VehicleRule('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VehicleRuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VehicleRuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehicleRuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicleRule).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
