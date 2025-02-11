import type { FleetRepositoryInterface } from '../../Infra/Repositories/Fleet/FleetRepositoryInterface';
import type { GetFleetQuery } from '../Queries/GetFleetQuery';

export class GetFleetHandler {
  constructor(private fleetRepository: FleetRepositoryInterface) {}

  async handle(command: GetFleetQuery) {
    return this.fleetRepository.getById(command.fleetId);
  }
}
