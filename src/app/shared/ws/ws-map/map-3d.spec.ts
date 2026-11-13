import type { StyleSpecification } from 'maplibre-gl';
import {
  BUILDINGS_LAYER_ID,
  TERRAIN_SOURCE_ID,
  beforeIdFor3d,
  buildingExtrusionLayer,
  findBuildingSource,
  hasOwnExtrusions,
  hillshadeLayer,
  skySpec,
  terrainDemSource,
  terrainSpec,
} from './map-3d';
import { SATELLITE_LABELS_LAYER_ID, getMapTheme, satelliteStyle } from './map-themes';

type Layers = Pick<StyleSpecification, 'layers' | 'sources'>;

// The shape of CARTO's styles: a `carto` vector source with a `building` layer.
const cartoLike: Layers = {
  sources: { carto: { type: 'vector', url: 'https://example.test/carto.json' } },
  layers: [
    { id: 'background', type: 'background' },
    { id: 'building', type: 'fill', source: 'carto', 'source-layer': 'building' },
    { id: 'place_label', type: 'symbol', source: 'carto', 'source-layer': 'place' },
  ],
};

// The shape of OpenFreeMap Liberty: OpenMapTiles plus its own 3D buildings.
const libertyLike: Layers = {
  sources: { openmaptiles: { type: 'vector', url: 'https://example.test/omt.json' } },
  layers: [
    { id: 'building', type: 'fill', source: 'openmaptiles', 'source-layer': 'building' },
    { id: 'building-3d', type: 'fill-extrusion', source: 'openmaptiles', 'source-layer': 'building' },
    { id: 'road_label', type: 'symbol', source: 'openmaptiles', 'source-layer': 'transportation_name' },
  ],
};

describe('3D view', () => {
  it('finds the building source of a vector style', () => {
    expect(findBuildingSource(cartoLike)).toEqual({ source: 'carto', sourceLayer: 'building' });
    const buildings: Layers = {
      sources: { protomaps: { type: 'vector', url: 'https://example.test/pm.json' } },
      layers: [{ id: 'b', type: 'fill', source: 'protomaps', 'source-layer': 'buildings' }],
    };
    expect(findBuildingSource(buildings)).toEqual({ source: 'protomaps', sourceLayer: 'buildings' });
  });

  it('finds no buildings in the satellite style', () => {
    expect(findBuildingSource(satelliteStyle(true))).toBeNull();
  });

  it('knows when a style draws its own 3D buildings', () => {
    expect(hasOwnExtrusions(libertyLike)).toBe(true);
    expect(hasOwnExtrusions(cartoLike)).toBe(false);
  });

  it('extrudes buildings from either schema with a fallback height', () => {
    const layer = buildingExtrusionLayer({ source: 'carto', sourceLayer: 'building' }, getMapTheme('dark'));
    expect(layer).toMatchObject({
      id: BUILDINGS_LAYER_ID,
      type: 'fill-extrusion',
      source: 'carto',
      'source-layer': 'building',
    });
    expect(layer.paint?.['fill-extrusion-color']).toBe(getMapTheme('dark').buildingColor);
    expect(JSON.stringify(layer.paint?.['fill-extrusion-height'])).toContain('render_height');
  });

  it('puts 3D layers under the labels', () => {
    expect(beforeIdFor3d(cartoLike)).toBe('place_label');
    expect(beforeIdFor3d(libertyLike)).toBe('road_label');
    expect(beforeIdFor3d(satelliteStyle(true), SATELLITE_LABELS_LAYER_ID)).toBe(SATELLITE_LABELS_LAYER_ID);
    expect(beforeIdFor3d({ layers: [{ id: 'bg', type: 'background' }] })).toBeUndefined();
  });

  it('uses keyless Terrarium elevation tiles', () => {
    const dem = terrainDemSource();
    expect(dem.encoding).toBe('terrarium');
    expect(dem.tiles?.[0]).toMatch(/^https:\/\/elevation-tiles-prod\.s3\.amazonaws\.com\/terrarium\//);
    expect(terrainSpec().source).toBe(TERRAIN_SOURCE_ID);
  });

  it('matches hillshade and sky to light and dark themes', () => {
    expect(skySpec(getMapTheme('dark'))['sky-color']).not.toBe(skySpec(getMapTheme('light'))['sky-color']);
    expect(hillshadeLayer(getMapTheme('satellite')).paint?.['hillshade-exaggeration']).toBeLessThan(
      hillshadeLayer(getMapTheme('street')).paint?.['hillshade-exaggeration'] as number,
    );
  });
});
