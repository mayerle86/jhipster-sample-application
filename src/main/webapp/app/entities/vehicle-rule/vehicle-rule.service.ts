import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleRule } from 'app/shared/model/vehicle-rule.model';

type EntityResponseType = HttpResponse<IVehicleRule>;
type EntityArrayResponseType = HttpResponse<IVehicleRule[]>;

@Injectable({ providedIn: 'root' })
export class VehicleRuleService {
  public resourceUrl = SERVER_API_URL + 'api/vehicle-rules';

  constructor(protected http: HttpClient) {}

  create(vehicleRule: IVehicleRule): Observable<EntityResponseType> {
    return this.http.post<IVehicleRule>(this.resourceUrl, vehicleRule, { observe: 'response' });
  }

  update(vehicleRule: IVehicleRule): Observable<EntityResponseType> {
    return this.http.put<IVehicleRule>(this.resourceUrl, vehicleRule, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IVehicleRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVehicleRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
