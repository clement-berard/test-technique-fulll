import { Before, World, setWorldConstructor } from '@cucumber/cucumber';
import { CreateFleetHandler } from '../src/App/Handlers/CreateFleetHandler';
import { GetFleetHandler } from '../src/App/Handlers/GetFleetHandler';
import { GetLocationVehicleHandler } from '../src/App/Handlers/GetLocationVehicleHandler';
import { ParkVehicleHandler } from '../src/App/Handlers/ParkVehicleHandler';
import type { Fleet } from '../src/Domain/Fleet';
import type { Vehicle } from '../src/Domain/Vehicle';
import { FleetRepository } from '../src/Infra/Repositories/Fleet/FleetRepository.js';
import { InMemoryFleetRepository } from '../src/Infra/Repositories/Fleet/InMemoryFleetRepository.js';
import { InMemoryLocationRepository } from '../src/Infra/Repositories/Location/InMemoryLocationRepository.js';
import { LocationRepository } from '../src/Infra/Repositories/Location/LocationRepository.js';
import { InMemoryVehicleRepository } from '../src/Infra/Repositories/Vehicle/InMemoryVehicleRepository.js';
import { VehicleRepository } from '../src/Infra/Repositories/Vehicle/VehicleRepository.js';

export class CustomWorld extends World {
  vehicleRepository: VehicleRepository | undefined;
  fleetRepository: FleetRepository | undefined;
  locationRepository: LocationRepository | undefined;
  fleet: Fleet | undefined;
  vehicle: Vehicle | undefined;
}

setWorldConstructor(CustomWorld);

Before(function (scenario) {
  const scenarioTags = scenario.pickle.tags.map((tag) => tag.name);
  const isDatabaseTest = scenarioTags.includes('@critical');

  this.vehicleRepository = isDatabaseTest ? new VehicleRepository() : new InMemoryVehicleRepository();
  this.fleetRepository = isDatabaseTest ? new FleetRepository() : new InMemoryFleetRepository();
  this.locationRepository = isDatabaseTest ? new LocationRepository() : new InMemoryLocationRepository();
  this.createFleetHandler = new CreateFleetHandler(this.fleetRepository);
  this.getFleetHandler = new GetFleetHandler(this.fleetRepository);
  this.parkVehicleHandler = new ParkVehicleHandler(this.locationRepository);
  this.getLocationVehicleHandler = new GetLocationVehicleHandler(this.locationRepository);
});
