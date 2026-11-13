import type { FeatureCollection } from 'geojson';
import type { LayerSpecification } from 'maplibre-gl';
import type { WsMapLine, WsMapPoint, WsMapPolygon } from './ws-map.models';

// Sources and layers drawn on top of every theme. They are re-added after each
// style swap, since setStyle drops whatever the old style did not have.
export const POINTS_SOURCE_ID = 'ws-points';
export const LINES_SOURCE_ID = 'ws-lines';
export const POLYGONS_SOURCE_ID = 'ws-polygons';
export const POINTS_LAYER_ID = 'ws-points-circle';

export function pointsCollection(points: WsMapPoint[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: points.map((p) => ({
      type: 'Feature',
      properties: { name: p.name, color: p.color },
      geometry: { type: 'Point', coordinates: [...p.point.coordinates] },
    })),
  };
}

export function linesCollection(lines: WsMapLine[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: lines.map((l) => ({
      type: 'Feature',
      properties: { color: l.color, alpha: l.alpha ?? 1, dotted: l.dotted ?? false },
      geometry: { type: 'LineString', coordinates: l.line.coordinates },
    })),
  };
}

export function polygonsCollection(polygons: WsMapPolygon[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: polygons.map((p) => ({
      type: 'Feature',
      properties: { color: p.color },
      geometry: { type: 'Polygon', coordinates: p.polygon.coordinates },
    })),
  };
}

export function overlayLayers(): LayerSpecification[] {
  return [
    {
      id: 'ws-polygons-fill',
      type: 'fill',
      source: POLYGONS_SOURCE_ID,
      paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.3 },
    },
    {
      id: 'ws-polygons-outline',
      type: 'line',
      source: POLYGONS_SOURCE_ID,
      paint: { 'line-color': ['get', 'color'], 'line-width': 2 },
    },
    {
      id: 'ws-lines-solid',
      type: 'line',
      source: LINES_SOURCE_ID,
      filter: ['!', ['get', 'dotted']],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': ['get', 'color'], 'line-opacity': ['get', 'alpha'], 'line-width': 5 },
    },
    {
      id: 'ws-lines-dotted',
      type: 'line',
      source: LINES_SOURCE_ID,
      filter: ['get', 'dotted'],
      paint: {
        'line-color': ['get', 'color'],
        'line-opacity': ['get', 'alpha'],
        'line-width': 5,
        'line-dasharray': [1, 2],
      },
    },
    {
      id: POINTS_LAYER_ID,
      type: 'circle',
      source: POINTS_SOURCE_ID,
      paint: {
        'circle-color': ['get', 'color'],
        'circle-radius': 8,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 2,
      },
    },
  ];
}
