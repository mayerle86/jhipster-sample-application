import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IVehicleRule } from 'app/shared/model/vehicle-rule.model';

@Component({
  selector: 'jhi-vehicle-rule-detail',
  templateUrl: './vehicle-rule-detail.component.html'
})
export class VehicleRuleDetailComponent implements OnInit {
  vehicleRule: IVehicleRule;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleRule }) => {
      this.vehicleRule = vehicleRule;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
