import type { Vehicle } from '../../../Domain/Vehicle';

export interface VehicleRepositoryInterface {
  save(plateNumber: string, fleetId: string): Promise<void>;
  getByPlate(plateNumber: string): Promise<Vehicle | null>;
  getByPlateAndFleet(plateNumber: string, fleetId: string): Promise<Vehicle | null>;
}
