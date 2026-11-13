import type { StyleSpecification } from 'maplibre-gl';
import {
  MAP_THEMES,
  SATELLITE_OVERLAY_LAYER_IDS,
  getMapTheme,
  isMapThemeChoice,
  resolveMapTheme,
  satelliteStyle,
  styleFor,
  withoutCamera,
} from './map-themes';

describe('map themes', () => {
  it('offers the five themes', () => {
    expect(MAP_THEMES.map((t) => t.id)).toEqual(['light', 'dark', 'street', 'color', 'satellite']);
  });

  it('uses keyless https style URLs for the vector themes', () => {
    for (const theme of MAP_THEMES.filter((t) => t.id !== 'satellite')) {
      expect(theme.styleUrl).toMatch(/^https:\/\//);
      expect(theme.styleUrl).not.toMatch(/key|token/i);
    }
  });

  it('resolves auto from the app theme and keeps an explicit choice', () => {
    expect(resolveMapTheme('auto', 'light')).toBe('light');
    expect(resolveMapTheme('auto', 'dark')).toBe('dark');
    expect(resolveMapTheme('satellite', 'dark')).toBe('satellite');
  });

  it('recognises valid choices only', () => {
    expect(isMapThemeChoice('auto')).toBe(true);
    expect(isMapThemeChoice('color')).toBe(true);
    expect(isMapThemeChoice('terrain')).toBe(false);
    expect(isMapThemeChoice(null)).toBe(false);
  });

  it('throws on an unknown theme id', () => {
    expect(() => getMapTheme('nope' as never)).toThrow();
  });

  it('returns a URL for vector themes and a built style for satellite', () => {
    expect(styleFor('street', { labels: true })).toBe('https://tiles.openfreemap.org/styles/liberty');
    const satellite = styleFor('satellite', { labels: true }) as StyleSpecification;
    expect(satellite.version).toBe(8);
    expect(satellite.layers[0]).toMatchObject({ type: 'raster', source: 'esri-world-imagery' });
  });

  it('shows or hides the satellite roads and labels', () => {
    for (const labels of [true, false]) {
      const style = satelliteStyle(labels);
      const overlays = style.layers.filter((l) => SATELLITE_OVERLAY_LAYER_IDS.includes(l.id));
      expect(overlays).toHaveLength(2);
      for (const layer of overlays) {
        expect(layer.layout?.visibility).toBe(labels ? 'visible' : 'none');
      }
    }
  });

  it('strips the camera from a style so a swap keeps the view', () => {
    const style = {
      version: 8,
      center: [0, 0],
      zoom: 3,
      bearing: 10,
      pitch: 20,
      sources: {},
      layers: [],
    } as StyleSpecification;
    const stripped = withoutCamera(style);
    expect(stripped).toEqual({ version: 8, sources: {}, layers: [] });
    expect(style.zoom).toBe(3);
  });
});
