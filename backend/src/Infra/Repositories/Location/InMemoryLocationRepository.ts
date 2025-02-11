import type { Location } from '../../../Domain/Location';
import type { LocationRepositoryInterface } from './LocationRepositoryInterface';

export class InMemoryLocationRepository implements LocationRepositoryInterface {
  private locations: Map<string, Map<string, Location[]>> = new Map();

  async save(fleetId: string, vehiclePlate: string, location: Location) {
    if (!this.locations.has(fleetId)) {
      this.locations.set(fleetId, new Map());
    }

    const fleetMap = this.locations.get(fleetId)!;

    if (!fleetMap.has(vehiclePlate)) {
      fleetMap.set(vehiclePlate, []);
    }

    fleetMap.get(vehiclePlate)!.push(location);
  }

  async isAlreadyParked(fleetId: string, vehiclePlate: string, location: Location) {
    const fleetMap = this.locations.get(fleetId);

    if (!fleetMap) {
      return false;
    }

    const existingLocations = fleetMap.get(vehiclePlate) || [];

    return existingLocations.some((loc) => loc.latitude === location.latitude && loc.longitude === location.longitude);
  }

  async getLocationByFleetAndPlate(fleetId: string, vehiclePlate: string) {
    const fleetMap = this.locations.get(fleetId);
    if (!fleetMap) {
      throw new Error(`No data found for fleetId: ${fleetId}`);
    }

    const locations = fleetMap.get(vehiclePlate);
    if (!locations || locations.length === 0) {
      throw new Error(`No location found for vehicle ${vehiclePlate} in fleet ${fleetId}.`);
    }

    return locations[locations.length - 1];
  }
}
