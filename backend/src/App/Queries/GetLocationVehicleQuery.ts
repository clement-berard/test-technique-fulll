export class GetLocationVehicleQuery {
  constructor(
    public readonly fleetId: string,
    public readonly plateNumber: string,
  ) {}
}
