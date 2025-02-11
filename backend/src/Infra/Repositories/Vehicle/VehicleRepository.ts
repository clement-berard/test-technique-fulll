import { Vehicle } from '../../../Domain/Vehicle';
import { db } from '../../Database';
import type { VehicleRepositoryInterface } from './VehicleRepositoryInterface';

export class VehicleRepository implements VehicleRepositoryInterface {
  async save(plateNumber: string, fleetId: string): Promise<void> {
    const stmt = db.prepare('INSERT INTO vehicles (plateNumber, fleetId) VALUES (?, ?)');
    stmt.run(plateNumber, fleetId);
  }

  async getByPlate(plateNumber: string): Promise<Vehicle | null> {
    const stmt = db.prepare('SELECT plateNumber FROM vehicles WHERE plateNumber = ?');
    const row = stmt.get(plateNumber) as { plateNumber: string } | undefined;
    return row ? new Vehicle(row.plateNumber) : null;
  }

  async getByPlateAndFleet(plateNumber: string, fleetId: string): Promise<Vehicle | null> {
    const stmt = db.prepare('SELECT plateNumber FROM vehicles WHERE plateNumber = ? AND fleetId = ?');
    const row = stmt.get(plateNumber, fleetId) as { plateNumber: string } | undefined;
    return row ? new Vehicle(row.plateNumber) : null;
  }
}
