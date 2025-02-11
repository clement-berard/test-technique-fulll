import type { Fleet } from '../../../Domain/Fleet';
import type { FleetRepositoryInterface } from './FleetRepositoryInterface';

export class InMemoryFleetRepository implements FleetRepositoryInterface {
  private fleets: Map<string, Fleet> = new Map();

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.id, fleet);
  }

  async getById(fleetId: string): Promise<Fleet | null> {
    return this.fleets.get(fleetId) || null;
  }
}
