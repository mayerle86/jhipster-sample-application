import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleRule } from 'app/shared/model/vehicle-rule.model';
import { VehicleRuleService } from './vehicle-rule.service';
import { VehicleRuleComponent } from './vehicle-rule.component';
import { VehicleRuleDetailComponent } from './vehicle-rule-detail.component';
import { VehicleRuleUpdateComponent } from './vehicle-rule-update.component';
import { VehicleRuleDeletePopupComponent } from './vehicle-rule-delete-dialog.component';
import { IVehicleRule } from 'app/shared/model/vehicle-rule.model';

@Injectable({ providedIn: 'root' })
export class VehicleRuleResolve implements Resolve<IVehicleRule> {
  constructor(private service: VehicleRuleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVehicleRule> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VehicleRule>) => response.ok),
        map((vehicleRule: HttpResponse<VehicleRule>) => vehicleRule.body)
      );
    }
    return of(new VehicleRule());
  }
}

export const vehicleRuleRoute: Routes = [
  {
    path: '',
    component: VehicleRuleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.vehicleRule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VehicleRuleDetailComponent,
    resolve: {
      vehicleRule: VehicleRuleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.vehicleRule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VehicleRuleUpdateComponent,
    resolve: {
      vehicleRule: VehicleRuleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.vehicleRule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VehicleRuleUpdateComponent,
    resolve: {
      vehicleRule: VehicleRuleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.vehicleRule.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const vehicleRulePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VehicleRuleDeletePopupComponent,
    resolve: {
      vehicleRule: VehicleRuleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.vehicleRule.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
