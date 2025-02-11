import { Fleet } from '../../../Domain/Fleet';
import type { Vehicle } from '../../../Domain/Vehicle';
import { db } from '../../Database';
import type { FleetRepositoryInterface } from './FleetRepositoryInterface';

export class FleetRepository implements FleetRepositoryInterface {
  async save(fleet: Fleet): Promise<void> {
    const stmt = db.prepare('INSERT INTO fleets (id, userId) VALUES (?, ?)');
    stmt.run(fleet.id, fleet.userId);
  }

  async getById(fleetId: string): Promise<Fleet | null> {
    const stmt = db.prepare('SELECT * FROM fleets WHERE id = ?');
    const row = stmt.get(fleetId) as Fleet;

    if (!row) return null;

    const fleet = new Fleet(row.id, row.userId);

    const vehicleStmt = db.prepare('SELECT plateNumber FROM vehicles WHERE fleetId = ?');
    const vehicleRows = vehicleStmt.all(fleetId) as Vehicle[];

    for (const vehicleRow of vehicleRows) {
      fleet.registerVehicle(vehicleRow.plateNumber);
    }

    return fleet;
  }
}
