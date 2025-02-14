import { VehiclePlate } from './VehiclePlate';

export class Vehicle {
  readonly vehiclePlateNumber: VehiclePlate;

  constructor(plateNumber: string) {
    if (!plateNumber) throw new Error('Plate number is required');
    this.vehiclePlateNumber = new VehiclePlate(plateNumber);
  }

  public get plateNumber(): string {
    return this.vehiclePlateNumber.toString();
  }
}
