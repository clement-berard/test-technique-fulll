import { program } from 'commander';
import { CreateFleetCommand } from './src/App/Commands/CreateFleetCommand';
import { ParkVehicleCommand } from './src/App/Commands/ParkVehicleCommand';
import { RegisterVehicleCommand } from './src/App/Commands/RegisterVehicleCommand';
import { CreateFleetHandler } from './src/App/Handlers/CreateFleetHandler';
import { ParkVehicleHandler } from './src/App/Handlers/ParkVehicleHandler';
import { RegisterVehicleHandler } from './src/App/Handlers/RegisterVehicleHandler';
import { Location } from './src/Domain/Location';
import { FleetRepository } from './src/Infra/Repositories/Fleet/FleetRepository';
import { LocationRepository } from './src/Infra/Repositories/Location/LocationRepository';
import { VehicleRepository } from './src/Infra/Repositories/Vehicle/VehicleRepository';

const fleetRepository = new FleetRepository();
const vehicleRepository = new VehicleRepository();
const locationRepository = new LocationRepository();

const createFleetHandler = new CreateFleetHandler(fleetRepository);
const registerVehicleHandler = new RegisterVehicleHandler(fleetRepository, vehicleRepository);
const parkVehicleHandler = new ParkVehicleHandler(locationRepository);

program
  .command('create <userId>')
  .description('Create a fleet and return fleetId')
  .action(async (userId) => {
    const fleetId = await createFleetHandler.handle(new CreateFleetCommand(userId));
    console.log(`Fleet created with ID: ${fleetId}`);
  });

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Register a vehicle in a fleet')
  .action(async (fleetId, vehiclePlateNumber) => {
    try {
      await registerVehicleHandler.handle(new RegisterVehicleCommand(fleetId, vehiclePlateNumber));
      console.log(`Vehicle ${vehiclePlateNumber} registered in fleet ${fleetId}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program
  .command('localize-vehicle <fleetId> <plateNumber> <lat> <lng> [alt]')
  .description('Localize a vehicle in a fleet')
  .action(async (fleetId, plateNumber, lat, lng, alt) => {
    try {
      const location = new Location(
        Number.parseFloat(lat),
        Number.parseFloat(lng),
        alt ? Number.parseFloat(alt) : undefined,
      );
      const command = new ParkVehicleCommand(fleetId, plateNumber, location);
      await parkVehicleHandler.handle(command);
      console.log(`Vehicle ${plateNumber} localized in fleet ${fleetId} at (${lat}, ${lng}, ${alt || 'N/A'})`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.parse(process.argv);
