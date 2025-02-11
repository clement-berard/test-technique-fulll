import { Location } from '../../../Domain/Location';
import { db } from '../../Database';
import type { LocationRepositoryInterface } from './LocationRepositoryInterface';

export class LocationRepository implements LocationRepositoryInterface {
  async save(fleetId: string, vehiclePlate: string, location: Location): Promise<void> {
    const stmt = db.prepare(`
      INSERT INTO locations (fleetId, plateNumber, latitude, longitude, altitude)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(fleetId, vehiclePlate, location.latitude, location.longitude, location.altitude ?? null);
  }

  async isAlreadyParked(fleetId: string, vehiclePlate: string, location: Location) {
    const stmt = db.prepare(`
      SELECT COUNT(*) as count
      FROM locations
      WHERE fleetId = ?
        AND plateNumber = ?
        AND latitude = ?
        AND longitude = ?
    `);

    const row = stmt.get(fleetId, vehiclePlate, location.latitude, location.longitude) as { count: number };

    return row.count > 0;
  }

  async getLocationByFleetAndPlate(fleetId: string, vehiclePlate: string) {
    const stmt = db.prepare(`
      SELECT latitude, longitude, altitude, timestamp
      FROM locations
      WHERE fleetId = ?
        AND plateNumber = ?
      ORDER BY timestamp DESC
      LIMIT 1
    `);

    const row = stmt.get(fleetId, vehiclePlate) as
      | { latitude: number; longitude: number; altitude: number | null; timestamp: string }
      | undefined;

    if (!row) {
      throw new Error(`No location found for vehicle ${vehiclePlate} in fleet ${fleetId}.`);
    }

    return new Location(row.latitude, row.longitude);
  }
}
