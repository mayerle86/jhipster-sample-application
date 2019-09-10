import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IVehicleRule } from 'app/shared/model/vehicle-rule.model';
import { AccountService } from 'app/core';
import { VehicleRuleService } from './vehicle-rule.service';

@Component({
  selector: 'jhi-vehicle-rule',
  templateUrl: './vehicle-rule.component.html'
})
export class VehicleRuleComponent implements OnInit, OnDestroy {
  vehicleRules: IVehicleRule[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected vehicleRuleService: VehicleRuleService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.vehicleRuleService
      .query()
      .pipe(
        filter((res: HttpResponse<IVehicleRule[]>) => res.ok),
        map((res: HttpResponse<IVehicleRule[]>) => res.body)
      )
      .subscribe(
        (res: IVehicleRule[]) => {
          this.vehicleRules = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVehicleRules();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVehicleRule) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInVehicleRules() {
    this.eventSubscriber = this.eventManager.subscribe('vehicleRuleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
