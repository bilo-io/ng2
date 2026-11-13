import type {
  ExpressionSpecification,
  FillExtrusionLayerSpecification,
  HillshadeLayerSpecification,
  LayerSpecification,
  RasterDEMSourceSpecification,
  SkySpecification,
  StyleSpecification,
  TerrainSpecification,
} from 'maplibre-gl';
import type { MapTheme } from './map-themes';

// Free, keyless elevation: Mapzen's Terrain Tiles on the AWS Open Data registry.
export const TERRARIUM_TILES =
  'https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png';
export const TERRAIN_ATTRIBUTION =
  'Terrain: <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md">Mapzen Terrain Tiles</a> (SRTM, GMTED, NED, ETOPO1 and others)';

export const TERRAIN_SOURCE_ID = 'ws-terrain-dem';
// Hillshade gets its own copy of the DEM source: MapLibre renders terrain and
// hillshade more cleanly when they don't share one source.
export const HILLSHADE_SOURCE_ID = 'ws-hillshade-dem';
export const HILLSHADE_LAYER_ID = 'ws-hillshade';
export const BUILDINGS_LAYER_ID = 'ws-3d-buildings';

export const TERRAIN_EXAGGERATION = 1.4;
export const PITCH_3D = 60;
export const BEARING_3D = -20;

export interface BuildingSource {
  source: string;
  sourceLayer: string;
}

export function terrainDemSource(): RasterDEMSourceSpecification {
  return {
    type: 'raster-dem',
    tiles: [TERRARIUM_TILES],
    encoding: 'terrarium',
    tileSize: 256,
    maxzoom: 15,
    attribution: TERRAIN_ATTRIBUTION,
  };
}

export function terrainSpec(): TerrainSpecification {
  return { source: TERRAIN_SOURCE_ID, exaggeration: TERRAIN_EXAGGERATION };
}

export function hillshadeLayer(theme: MapTheme): HillshadeLayerSpecification {
  const dark = theme.scheme === 'dark';
  return {
    id: HILLSHADE_LAYER_ID,
    type: 'hillshade',
    source: HILLSHADE_SOURCE_ID,
    paint: {
      'hillshade-exaggeration': theme.id === 'satellite' ? 0.15 : 0.35,
      'hillshade-shadow-color': dark ? '#000000' : '#5a4f3c',
      'hillshade-highlight-color': dark ? '#3a3a3a' : '#ffffff',
      'hillshade-accent-color': dark ? '#000000' : '#5a4f3c',
    },
  };
}

export function skySpec(theme: MapTheme): SkySpecification {
  return theme.scheme === 'dark'
    ? {
        'sky-color': '#0b1324',
        'horizon-color': '#22324a',
        'fog-color': '#10151d',
        'sky-horizon-blend': 0.6,
        'horizon-fog-blend': 0.6,
        'fog-ground-blend': 0.6,
      }
    : {
        'sky-color': '#8ec9f7',
        'horizon-color': '#eaf4fb',
        'fog-color': '#f4f7f9',
        'sky-horizon-blend': 0.6,
        'horizon-fog-blend': 0.6,
        'fog-ground-blend': 0.6,
      };
}

/** True when the style already draws 3D buildings itself (OpenFreeMap Liberty does). */
export function hasOwnExtrusions(style: Pick<StyleSpecification, 'layers'>): boolean {
  return style.layers.some((layer) => layer.type === 'fill-extrusion');
}

/**
 * The vector source and source-layer holding building footprints, taken from the
 * style's own building layer: `building` in OpenMapTiles, `buildings` in CARTO's
 * Protomaps-based tiles. Null for raster styles such as satellite.
 */
export function findBuildingSource(style: Pick<StyleSpecification, 'layers' | 'sources'>): BuildingSource | null {
  for (const layer of style.layers) {
    if (!hasSourceLayer(layer)) continue;
    const sourceLayer = layer['source-layer'];
    if (!/^buildings?$/.test(sourceLayer)) continue;
    if (style.sources[layer.source]?.type !== 'vector') continue;
    return { source: layer.source, sourceLayer };
  }
  return null;
}

export function buildingExtrusionLayer(
  building: BuildingSource,
  theme: MapTheme,
): FillExtrusionLayerSpecification {
  // OpenMapTiles has render_height; CARTO/Protomaps has height, and not always.
  const height: ExpressionSpecification = ['coalesce', ['get', 'render_height'], ['get', 'height'], 6];
  const base: ExpressionSpecification = ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0];
  return {
    id: BUILDINGS_LAYER_ID,
    type: 'fill-extrusion',
    source: building.source,
    'source-layer': building.sourceLayer,
    minzoom: 13,
    paint: {
      'fill-extrusion-color': theme.buildingColor,
      'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, height],
      'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, base],
      'fill-extrusion-opacity': 0.85,
    },
  };
}

/** The first label layer, so 3D layers go underneath the text. */
export function firstSymbolLayerId(style: Pick<StyleSpecification, 'layers'>): string | undefined {
  return style.layers.find((layer) => layer.type === 'symbol')?.id;
}

/** Where hillshade and 3D buildings go: under labels (or the satellite label layer). */
export function beforeIdFor3d(style: Pick<StyleSpecification, 'layers'>, labelsLayerId?: string): string | undefined {
  if (labelsLayerId && style.layers.some((layer) => layer.id === labelsLayerId)) return labelsLayerId;
  return firstSymbolLayerId(style);
}

function hasSourceLayer(
  layer: LayerSpecification,
): layer is LayerSpecification & { source: string; 'source-layer': string } {
  return 'source' in layer && typeof (layer as { 'source-layer'?: unknown })['source-layer'] === 'string';
}
