export class VehiclePlate {
  private readonly value: string;
  constructor(plate: string) {
    // not a complex validation, but for an example
    if (!plate || !plate.trim()) {
      throw new Error('Plate number cannot be empty');
    }
    this.value = plate;
  }

  toString(): string {
    return this.value;
  }
}
