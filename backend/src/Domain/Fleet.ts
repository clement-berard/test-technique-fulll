import { Vehicle } from './Vehicle';

export class Fleet {
  readonly id: string;
  readonly userId: string;
  private vehicles: Map<string, Vehicle>;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
    this.vehicles = new Map();
  }

  registerVehicle(plateNumber: string): void {
    if (this.vehicles.has(plateNumber)) {
      throw new Error('This vehicle is already registered in this fleet');
    }
    this.vehicles.set(plateNumber, new Vehicle(plateNumber));
  }

  hasVehicle(plateNumber: string): boolean {
    return this.vehicles.has(plateNumber);
  }
}
