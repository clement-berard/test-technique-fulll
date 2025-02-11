import type { LocationRepositoryInterface } from '../../Infra/Repositories/Location/LocationRepositoryInterface';
import type { GetLocationVehicleQuery } from '../Queries/GetLocationVehicleQuery';

export class GetLocationVehicleHandler {
  constructor(private locationRepository: LocationRepositoryInterface) {}

  async handle(command: GetLocationVehicleQuery) {
    return this.locationRepository.getLocationByFleetAndPlate(command.fleetId, command.plateNumber);
  }
}
