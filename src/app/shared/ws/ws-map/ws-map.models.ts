import type { LineString, Point, Polygon, Position } from '../../geojson';

/** A named point, drawn as a coloured circle with a popup. */
export interface WsMapPoint {
  name: string;
  point: Point;
  color: string;
}

export interface WsMapLine {
  color: string;
  line: LineString;
  /** 0 to 1. */
  alpha?: number;
  dotted?: boolean;
}

export interface WsMapPolygon {
  color: string;
  polygon: Polygon;
}

/** Which draggable pin: green start or red end. */
export type WsMapMarkerKind = 'start' | 'end';

export interface WsMapMarker {
  name: string;
  point: Point;
}

export interface WsMapBounds {
  northEast: Point;
  southWest: Point;
}

/** The camera after the map stops moving. */
export interface WsMapView {
  center: Position;
  zoom: number;
  pitch: number;
  bearing: number;
  bounds: WsMapBounds;
}

/** A camera move asked for through WsMapService. */
export type WsMapCameraCommand =
  | { kind: 'panTo'; point: Point; zoom?: number }
  | { kind: 'fitBounds'; points: Point[] };
