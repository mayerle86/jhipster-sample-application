import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
  VehicleRuleComponent,
  VehicleRuleDetailComponent,
  VehicleRuleUpdateComponent,
  VehicleRuleDeletePopupComponent,
  VehicleRuleDeleteDialogComponent,
  vehicleRuleRoute,
  vehicleRulePopupRoute
} from './';

const ENTITY_STATES = [...vehicleRuleRoute, ...vehicleRulePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehicleRuleComponent,
    VehicleRuleDetailComponent,
    VehicleRuleUpdateComponent,
    VehicleRuleDeleteDialogComponent,
    VehicleRuleDeletePopupComponent
  ],
  entryComponents: [VehicleRuleComponent, VehicleRuleUpdateComponent, VehicleRuleDeleteDialogComponent, VehicleRuleDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationVehicleRuleModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
