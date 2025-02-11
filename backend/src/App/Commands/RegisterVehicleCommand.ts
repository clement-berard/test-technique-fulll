export class RegisterVehicleCommand {
  constructor(
    public fleetId: string,
    public plateNumber: string,
  ) {}
}
