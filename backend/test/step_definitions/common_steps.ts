// see "Improvement Points" in README.md
import assert from 'node:assert';
import { Given, Then, When } from '@cucumber/cucumber';
import { CreateFleetCommand } from '../../src/App/Commands/CreateFleetCommand';
import { ParkVehicleCommand } from '../../src/App/Commands/ParkVehicleCommand';
import { RegisterVehicleCommand } from '../../src/App/Commands/RegisterVehicleCommand';
import { RegisterVehicleHandler } from '../../src/App/Handlers/RegisterVehicleHandler';
import { GetFleetQuery } from '../../src/App/Queries/GetFleetQuery';
import { GetLocationVehicleQuery } from '../../src/App/Queries/GetLocationVehicleQuery';
import type { Fleet } from '../../src/Domain/Fleet';
import { Location } from '../../src/Domain/Location';
import { Vehicle } from '../../src/Domain/Vehicle.js';

let fleetId: string;
let anotherFleet: Fleet;
let location: Location;

Given('my fleet', async function () {
  fleetId = await this.createFleetHandler.handle(new CreateFleetCommand('user123'));
  this.fleet = await this.getFleetHandler.handle(new GetFleetQuery(fleetId));
});

Given('a vehicle', function () {
  this.vehicle = new Vehicle(`ABC-${Date.now()}`);
});

Given('I register this vehicle into my fleet', async function () {
  const registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
  const command = new RegisterVehicleCommand(this.fleet.id, this.vehicle.plateNumber);
  await registerVehicleHandler.handle(command);
  this.fleet = await this.getFleetHandler.handle(new GetFleetQuery(fleetId));
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  const isInFleet = this.fleet.hasVehicle(this.vehicle.plateNumber);
  assert.ok(isInFleet);
});

Given('I have registered this vehicle into my fleet', async function () {
  const registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
  const command = new RegisterVehicleCommand(this.fleet.id, this.vehicle.plateNumber);
  await registerVehicleHandler.handle(command);
});

Given('I try to register this vehicle into my fleet', async function () {
  try {
    const registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
    const command = new RegisterVehicleCommand(this.fleet.id, this.vehicle.plateNumber);
    await registerVehicleHandler.handle(command);
  } catch (error) {
    this.error = error;
  }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.ok(this.error);
  assert.strictEqual(this.error.message, 'This vehicle is already registered in this fleet');
});

Given('a location', function () {
  location = new Location(48.8566, 2.3522);
});

When('I park my vehicle at this location', async function () {
  await this.parkVehicleHandler.handle(new ParkVehicleCommand(this.fleet.id, this.vehicle.plateNumber, location));
});

Then('the known location of my vehicle should verify this location', async function () {
  const resolvedLocation = await this.getLocationVehicleHandler.handle(
    new GetLocationVehicleQuery(fleetId, this.vehicle.plateNumber),
  );

  assert.ok(resolvedLocation.equals(location));
});

Given('my vehicle has been parked into this location', async function () {
  await this.parkVehicleHandler.handle(new ParkVehicleCommand(this.fleet.id, this.vehicle.plateNumber, location));
});

When('I try to park my vehicle at this location', async function () {
  try {
    await this.parkVehicleHandler.handle(new ParkVehicleCommand(this.fleet.id, this.vehicle.plateNumber, location));
  } catch (error) {
    this.error = error;
  }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.ok(this.error);
  assert.strictEqual(this.error.message, 'This vehicle is already parked at this location');
});

Given('the fleet of another user', async function () {
  const fleetId = await this.createFleetHandler.handle(new CreateFleetCommand('otherUser'));
  anotherFleet = await this.getFleetHandler.handle(new GetFleetQuery(fleetId));
});

Given("this vehicle has been registered into the other user's fleet", async function () {
  const registerVehicleHandler = new RegisterVehicleHandler(this.fleetRepository, this.vehicleRepository);
  const command = new RegisterVehicleCommand(anotherFleet.id, this.vehicle.plateNumber);
  await registerVehicleHandler.handle(command);
});
