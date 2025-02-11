import type { FleetRepository } from '../../Infra/Repositories/Fleet/FleetRepository';
import type { VehicleRepository } from '../../Infra/Repositories/Vehicle/VehicleRepository';
import type { RegisterVehicleCommand } from '../Commands/RegisterVehicleCommand';

export class RegisterVehicleHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehicleRepository: VehicleRepository,
  ) {}

  async handle(command: RegisterVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.getById(command.fleetId);
    if (!fleet) throw new Error('Fleet not found');

    const existingVehicle = await this.vehicleRepository.getByPlateAndFleet(command.plateNumber, command.fleetId);
    if (existingVehicle) throw new Error('This vehicle is already registered in this fleet');

    fleet.registerVehicle(command.plateNumber);
    await this.vehicleRepository.save(command.plateNumber, command.fleetId);
  }
}
