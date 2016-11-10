import { Point, LineString, Polygon } from '../../models/geojson.models';

export enum WsMapState {
    Journeys,
    Transit,
    Realtime,
    Simulator
}
export class WsMapLine {
    constructor(
        public color: string,
        public line: LineString,
        public alpha: number = 1.0,
        public dotted: boolean = false) { }
}
export class WsMapPoint {
    constructor(
        public name: string,
        public point: Point,
        public color: string) { }
}
export class WsMapPolygon {
    constructor(
        public color: string,
        public polygon: Polygon) { }
}
export class WsMapLayer {
    constructor(
        public name: string,
        public type: WsMapLayerType,
        public data: any) { }
}
export enum WsMapLayerType {
    None,
    Points,
    Lines,
    Polygons
}