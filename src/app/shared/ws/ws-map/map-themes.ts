import type { StyleSpecification } from 'maplibre-gl';
import type { UiScheme } from '../../../core/ui-theme.service';

export type MapThemeId = 'light' | 'dark' | 'street' | 'color' | 'satellite';
/** A theme, or `auto`: follow the app's light/dark theme. */
export type MapThemeChoice = MapThemeId | 'auto';

export interface MapTheme {
  id: MapThemeId;
  label: string;
  /** Who makes the style or imagery, for the UI and the README. */
  source: string;
  /** A MapLibre style URL, or null when the style is built here (satellite). */
  styleUrl: string | null;
  /** Whether the map reads as light or dark, for the 3D layer colours. */
  scheme: UiScheme;
  /** Colour of the 3D building extrusions added in 3D view. */
  buildingColor: string;
}

export const ESRI_ATTRIBUTION =
  'Imagery &copy; <a href="https://www.esri.com">Esri</a>, Maxar, Earthstar Geographics and the GIS User Community';
export const ESRI_REFERENCE_ATTRIBUTION =
  'Labels and roads &copy; <a href="https://www.esri.com">Esri</a>, HERE, Garmin, &copy; OpenStreetMap contributors and the GIS User Community';

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
// Esri tile URLs are {z}/{y}/{x}, row before column.
export const ESRI_WORLD_IMAGERY_TILES = `${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`;
export const ESRI_ROADS_TILES = `${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`;
export const ESRI_PLACES_TILES = `${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`;

export const SATELLITE_ROADS_LAYER_ID = 'ws-satellite-roads';
export const SATELLITE_LABELS_LAYER_ID = 'ws-satellite-labels';
/** The overlays the "Place labels" switch shows and hides, bottom first. */
export const SATELLITE_OVERLAY_LAYER_IDS = [SATELLITE_ROADS_LAYER_ID, SATELLITE_LABELS_LAYER_ID];

export const MAP_THEMES: readonly MapTheme[] = [
  {
    id: 'light',
    label: 'Light',
    source: 'CARTO Positron',
    styleUrl: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    scheme: 'light',
    buildingColor: '#d6d6d6',
  },
  {
    id: 'dark',
    label: 'Dark',
    source: 'CARTO Dark Matter',
    styleUrl: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    scheme: 'dark',
    buildingColor: '#3b3b44',
  },
  {
    id: 'street',
    label: 'Street',
    source: 'OpenFreeMap Liberty',
    styleUrl: 'https://tiles.openfreemap.org/styles/liberty',
    scheme: 'light',
    buildingColor: '#d9d0c9',
  },
  {
    id: 'color',
    label: 'Colour',
    source: 'CARTO Voyager',
    styleUrl: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    scheme: 'light',
    buildingColor: '#e8d5b9',
  },
  {
    id: 'satellite',
    label: 'Satellite',
    source: 'Esri World Imagery',
    styleUrl: null,
    scheme: 'dark',
    buildingColor: '#c9c9c9',
  },
];

export const MAP_THEME_IDS = MAP_THEMES.map((theme) => theme.id);

export function isMapThemeChoice(value: unknown): value is MapThemeChoice {
  return value === 'auto' || MAP_THEME_IDS.includes(value as MapThemeId);
}

export function getMapTheme(id: MapThemeId): MapTheme {
  const theme = MAP_THEMES.find((t) => t.id === id);
  if (!theme) throw new Error(`Unknown map theme: ${id}`);
  return theme;
}

/** `auto` follows the app: Positron in light mode, Dark Matter in dark mode. */
export function resolveMapTheme(choice: MapThemeChoice, uiScheme: UiScheme): MapThemeId {
  if (choice !== 'auto') return choice;
  return uiScheme === 'dark' ? 'dark' : 'light';
}

/** Esri World Imagery, with Esri's roads and place names on top when `labels`. No API key needed. */
export function satelliteStyle(labels: boolean): StyleSpecification {
  const visibility = labels ? 'visible' : 'none';
  return {
    version: 8,
    name: 'Satellite (Esri World Imagery)',
    sources: {
      'esri-world-imagery': {
        type: 'raster',
        tiles: [ESRI_WORLD_IMAGERY_TILES],
        tileSize: 256,
        maxzoom: 19,
        attribution: ESRI_ATTRIBUTION,
      },
      'esri-roads': {
        type: 'raster',
        tiles: [ESRI_ROADS_TILES],
        tileSize: 256,
        maxzoom: 19,
        attribution: ESRI_REFERENCE_ATTRIBUTION,
      },
      'esri-places': {
        type: 'raster',
        tiles: [ESRI_PLACES_TILES],
        tileSize: 256,
        maxzoom: 19,
        attribution: ESRI_REFERENCE_ATTRIBUTION,
      },
    },
    layers: [
      { id: 'satellite', type: 'raster', source: 'esri-world-imagery' },
      {
        id: SATELLITE_ROADS_LAYER_ID,
        type: 'raster',
        source: 'esri-roads',
        layout: { visibility },
        paint: { 'raster-opacity': 0.7 },
      },
      { id: SATELLITE_LABELS_LAYER_ID, type: 'raster', source: 'esri-places', layout: { visibility } },
    ],
  };
}

/** What `map.setStyle` takes for a theme: a style URL, or a style object for satellite. */
export function styleFor(id: MapThemeId, options: { labels: boolean }): string | StyleSpecification {
  const theme = getMapTheme(id);
  return theme.styleUrl ?? satelliteStyle(options.labels);
}

/**
 * Drops a style's own camera so swapping themes keeps the user's view.
 * Used as MapLibre's `transformStyle` on every `setStyle`.
 */
export function withoutCamera(style: StyleSpecification): StyleSpecification {
  const copy: Record<string, unknown> = { ...style };
  for (const key of CAMERA_KEYS) delete copy[key];
  return copy as StyleSpecification;
}

const CAMERA_KEYS = ['center', 'zoom', 'bearing', 'pitch', 'roll'] as const;
