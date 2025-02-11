import { CreateFleetCommand } from './src/App/Commands/CreateFleetCommand';
import { ParkVehicleCommand } from './src/App/Commands/ParkVehicleCommand';
import { RegisterVehicleCommand } from './src/App/Commands/RegisterVehicleCommand';
import { CreateFleetHandler } from './src/App/Handlers/CreateFleetHandler';
import { GetFleetHandler } from './src/App/Handlers/GetFleetHandler';
import { GetLocationVehicleHandler } from './src/App/Handlers/GetLocationVehicleHandler';
import { ParkVehicleHandler } from './src/App/Handlers/ParkVehicleHandler';
import { RegisterVehicleHandler } from './src/App/Handlers/RegisterVehicleHandler';
import { GetFleetQuery } from './src/App/Queries/GetFleetQuery';
import { GetLocationVehicleQuery } from './src/App/Queries/GetLocationVehicleQuery';
import { Location } from './src/Domain/Location';
import { Vehicle } from './src/Domain/Vehicle';
import { FleetRepository } from './src/Infra/Repositories/Fleet/FleetRepository';
import { InMemoryFleetRepository } from './src/Infra/Repositories/Fleet/InMemoryFleetRepository';
import { InMemoryLocationRepository } from './src/Infra/Repositories/Location/InMemoryLocationRepository';
import { LocationRepository } from './src/Infra/Repositories/Location/LocationRepository';
import { InMemoryVehicleRepository } from './src/Infra/Repositories/Vehicle/InMemoryVehicleRepository';
import { VehicleRepository } from './src/Infra/Repositories/Vehicle/VehicleRepository';

const isDatabaseTest = true;

const vehicleRepository = isDatabaseTest ? new VehicleRepository() : new InMemoryVehicleRepository();
const fleetRepository = isDatabaseTest ? new FleetRepository() : new InMemoryFleetRepository();
const locationRepository = isDatabaseTest ? new LocationRepository() : new InMemoryLocationRepository();

const createFleetHandler = new CreateFleetHandler(fleetRepository);
const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository, vehicleRepository);
const parkVehicleHandler = new ParkVehicleHandler(locationRepository);
const getLocationVehicleHandler = new GetLocationVehicleHandler(locationRepository);
const getFleetHandler = new GetFleetHandler(fleetRepository);

const userId = '123';

async function run() {
  const fleetId = await createFleetHandler.handle(new CreateFleetCommand(userId));

  const v1 = new Vehicle('ABC123');
  const v2 = new Vehicle('ABC1234');

  for (const vehicle of [v1, v2]) {
    await registerVehicleHandler.handle(new RegisterVehicleCommand(fleetId, vehicle.plateNumber));
  }

  const myFleet = await getFleetHandler.handle(new GetFleetQuery(fleetId));

  console.log('myFleet', myFleet);

  const location = new Location(48.8566, 2.3522);

  await parkVehicleHandler.handle(new ParkVehicleCommand(fleetId, v1.plateNumber, location));

  const cc = await getLocationVehicleHandler.handle(new GetLocationVehicleQuery(fleetId, v1.plateNumber));
}

run();
