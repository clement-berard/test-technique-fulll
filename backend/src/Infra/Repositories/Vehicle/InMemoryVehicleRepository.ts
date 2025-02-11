import { Vehicle } from '../../../Domain/Vehicle';
import type { VehicleRepositoryInterface } from './VehicleRepositoryInterface';

export class InMemoryVehicleRepository implements VehicleRepositoryInterface {
  private vehicles: Map<string, Map<string, Vehicle>> = new Map();

  async save(plateNumber: string, fleetId: string): Promise<void> {
    if (!this.vehicles.has(fleetId)) {
      this.vehicles.set(fleetId, new Map());
    }
    this.vehicles.get(fleetId)?.set(plateNumber, new Vehicle(plateNumber));
  }

  async getByPlate(plateNumber: string): Promise<Vehicle | null> {
    for (const fleet of this.vehicles.values()) {
      if (fleet.has(plateNumber)) {
        return fleet.get(plateNumber) || null;
      }
    }
    return null;
  }

  async getByPlateAndFleet(plateNumber: string, fleetId: string): Promise<Vehicle | null> {
    return this.vehicles.get(fleetId)?.get(plateNumber) || null;
  }
}
