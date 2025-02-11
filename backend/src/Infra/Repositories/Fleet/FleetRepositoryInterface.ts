import type { Fleet } from '../../../Domain/Fleet';

export interface FleetRepositoryInterface {
  save(fleet: Fleet): Promise<void>;
  getById(fleetId: string): Promise<Fleet | null>;
}
