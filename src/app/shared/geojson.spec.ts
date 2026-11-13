import { Point } from './geojson';

describe('Point', () => {
  it('reads [lng, lat] coordinates', () => {
    const point = new Point([28.18, -25.95]);
    expect(point.longitude).toBe(28.18);
    expect(point.latitude).toBe(-25.95);
    expect(point.isValid()).toBe(true);
  });

  it('rejects out-of-range or missing coordinates', () => {
    expect(Point.validLatLng(91, 0)).toBe(false);
    expect(Point.validLatLng(0, -181)).toBe(false);
    expect(Point.validLatLng(Number.NaN, 0)).toBe(false);
  });
});
