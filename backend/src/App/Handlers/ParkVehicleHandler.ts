import type { LocationRepositoryInterface } from '../../Infra/Repositories/Location/LocationRepositoryInterface';
import type { ParkVehicleCommand } from '../Commands/ParkVehicleCommand';

export class ParkVehicleHandler {
  constructor(private locationRepository: LocationRepositoryInterface) {}

  async handle(command: ParkVehicleCommand): Promise<void> {
    const alreadyParked = await this.locationRepository.isAlreadyParked(
      command.fleetId,
      command.plateNumber,
      command.location,
    );
    if (alreadyParked) throw new Error('This vehicle is already parked at this location');

    await this.locationRepository.save(command.fleetId, command.plateNumber, command.location);
  }
}
