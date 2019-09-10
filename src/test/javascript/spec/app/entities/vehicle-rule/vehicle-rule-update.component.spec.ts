/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VehicleRuleUpdateComponent } from 'app/entities/vehicle-rule/vehicle-rule-update.component';
import { VehicleRuleService } from 'app/entities/vehicle-rule/vehicle-rule.service';
import { VehicleRule } from 'app/shared/model/vehicle-rule.model';

describe('Component Tests', () => {
  describe('VehicleRule Management Update Component', () => {
    let comp: VehicleRuleUpdateComponent;
    let fixture: ComponentFixture<VehicleRuleUpdateComponent>;
    let service: VehicleRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [VehicleRuleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VehicleRuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VehicleRuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VehicleRuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VehicleRule('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new VehicleRule();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
