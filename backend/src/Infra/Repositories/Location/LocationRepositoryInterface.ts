import type { Location } from '../../../Domain/Location';

export interface LocationRepositoryInterface {
  save(fleetId: string, vehiclePlate: string, location: Location): Promise<void>;
  isAlreadyParked(fleetId: string, vehiclePlate: string, location: Location): Promise<boolean>;
  getLocationByFleetAndPlate(fleetId: string, vehiclePlate: string): Promise<Location>;
}
