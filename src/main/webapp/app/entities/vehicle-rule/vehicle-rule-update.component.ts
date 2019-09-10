import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IVehicleRule, VehicleRule } from 'app/shared/model/vehicle-rule.model';
import { VehicleRuleService } from './vehicle-rule.service';

@Component({
  selector: 'jhi-vehicle-rule-update',
  templateUrl: './vehicle-rule-update.component.html'
})
export class VehicleRuleUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    key: [null, [Validators.required]],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    condition: [null, [Validators.required]],
    comment: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected vehicleRuleService: VehicleRuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vehicleRule }) => {
      this.updateForm(vehicleRule);
    });
  }

  updateForm(vehicleRule: IVehicleRule) {
    this.editForm.patchValue({
      id: vehicleRule.id,
      key: vehicleRule.key,
      name: vehicleRule.name,
      description: vehicleRule.description,
      condition: vehicleRule.condition,
      comment: vehicleRule.comment
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vehicleRule = this.createFromForm();
    if (vehicleRule.id !== undefined) {
      this.subscribeToSaveResponse(this.vehicleRuleService.update(vehicleRule));
    } else {
      this.subscribeToSaveResponse(this.vehicleRuleService.create(vehicleRule));
    }
  }

  private createFromForm(): IVehicleRule {
    return {
      ...new VehicleRule(),
      id: this.editForm.get(['id']).value,
      key: this.editForm.get(['key']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      condition: this.editForm.get(['condition']).value,
      comment: this.editForm.get(['comment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleRule>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
