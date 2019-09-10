import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleRule } from 'app/shared/model/vehicle-rule.model';
import { VehicleRuleService } from './vehicle-rule.service';

@Component({
  selector: 'jhi-vehicle-rule-delete-dialog',
  templateUrl: './vehicle-rule-delete-dialog.component.html'
})
export class VehicleRuleDeleteDialogComponent {
  vehicleRule: IVehicleRule;

  constructor(
    protected vehicleRuleService: VehicleRuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.vehicleRuleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vehicleRuleListModification',
        content: 'Deleted an vehicleRule'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vehicle-rule-delete-popup',
  template: ''
})
export class VehicleRuleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehicleRule }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VehicleRuleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vehicleRule = vehicleRule;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vehicle-rule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vehicle-rule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
