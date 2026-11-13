// GeoJSON geometries (RFC 7946). Coordinates are [longitude, latitude].

export type Position = [lng: number, lat: number];

export class Point {
  readonly type = 'Point';
  constructor(public coordinates: Position) {}

  get longitude(): number {
    return this.coordinates[0];
  }

  get latitude(): number {
    return this.coordinates[1];
  }

  isValid(): boolean {
    return Point.validLatLng(this.latitude, this.longitude);
  }

  static validLatLng(latitude: number, longitude: number): boolean {
    return (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude <= 90 &&
      latitude >= -90 &&
      longitude <= 180 &&
      longitude >= -180
    );
  }
}

export interface LineString {
  type: 'LineString';
  coordinates: Position[];
}

export interface Polygon {
  type: 'Polygon';
  coordinates: Position[][];
}

export function lineString(coordinates: Position[]): LineString {
  return { type: 'LineString', coordinates };
}

export function polygon(coordinates: Position[][]): Polygon {
  return { type: 'Polygon', coordinates };
}
