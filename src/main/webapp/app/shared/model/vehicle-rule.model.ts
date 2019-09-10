export interface IVehicleRule {
  id?: string;
  key?: string;
  name?: string;
  description?: any;
  condition?: any;
  comment?: any;
}

export class VehicleRule implements IVehicleRule {
  constructor(
    public id?: string,
    public key?: string,
    public name?: string,
    public description?: any,
    public condition?: any,
    public comment?: any
  ) {}
}
