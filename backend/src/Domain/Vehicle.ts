export class Vehicle {
  readonly plateNumber: string;

  constructor(plateNumber: string) {
    if (!plateNumber) throw new Error('Plate number is required');
    this.plateNumber = plateNumber;
  }
}
