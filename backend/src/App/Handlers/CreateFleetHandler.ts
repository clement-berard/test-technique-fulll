import { randomUUID } from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { Fleet } from '../../Domain/Fleet';
import type { FleetRepositoryInterface } from '../../Infra/Repositories/Fleet/FleetRepositoryInterface';
import type { CreateFleetCommand } from '../Commands/CreateFleetCommand';

export class CreateFleetHandler {
  constructor(private fleetRepository: FleetRepositoryInterface) {}

  async handle(command: CreateFleetCommand): Promise<string> {
    const fleetId = randomUUID();
    const fleet = new Fleet(fleetId, command.userId);
    await this.fleetRepository.save(fleet);
    return fleetId;
  }
}
