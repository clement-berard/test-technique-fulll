export class Location {
  readonly latitude: number;
  readonly longitude: number;
  readonly altitude?: number;

  constructor(latitude: number, longitude: number, altitude?: number) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }

    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }
}
