import { Injectable, Output, EventEmitter } from '@angular/core';
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
@Injectable()
export class WsMapService {
    public styles: string[] = [];
    public lines: any[] = [];
    public stops: any[] = [];
    public point: Point;
    public layers: WsMapLayer[] = [];

    @Output() addLayer$: EventEmitter<WsMapLayer> = new EventEmitter<WsMapLayer>();
    @Output() removeLayer$: EventEmitter<any> = new EventEmitter<any>();

    @Output() focusPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStyle$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updatedPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStartPoint$: EventEmitter<WsMapPoint> = new EventEmitter<WsMapPoint>();
    @Output() updatedEndPoint$: EventEmitter<WsMapPoint> = new EventEmitter<WsMapPoint>();
    @Output() updateStartName$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateEndName$: EventEmitter<string> = new EventEmitter<string>();

    @Output() didClickStartMarker$ = new EventEmitter();
    @Output() didMoveStartMarker$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() didClickEndMarker$ = new EventEmitter();
    @Output() didMoveEndMarker$: EventEmitter<Point> = new EventEmitter<Point>();

    @Output() addLines: EventEmitter<WsMapLine[]> = new EventEmitter<WsMapLine[]>();
    @Output() removeLines = new EventEmitter();
    @Output() addPoints$: EventEmitter<WsMapPoint[]> = new EventEmitter<WsMapPoint[]>();
    @Output() addCircles$: EventEmitter<WsMapPoint[]> = new EventEmitter<WsMapPoint[]>();
    @Output() removePoints = new EventEmitter();
    @Output() showPolygons$: EventEmitter<WsMapPolygon[]> = new EventEmitter<WsMapPolygon[]>();
    @Output() hidePolygons$: EventEmitter<WsMapPolygon[]> = new EventEmitter<WsMapPolygon[]>();

    @Output() panToPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() fitBounds$: EventEmitter<Point[]> = new EventEmitter<Point[]>();
    @Output() moved$: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.initMapService();
    }

    initMapService() {
        this.styles = [
            'streets',
            'satellite',
            'light',
            'dark'
        ];
    }

    // Map Stuff    
    public setPoint(point: Point) {
        // console.log('Point:', point);
        this.point = point;
        this.updatedPoint$.emit(this.point);
    }
    public focusPoint(point: Point) {
        // console.log('map.service: focusPoint()', point);
        this.focusPoint$.emit(point);
    }

    // Layers
    public addLayer(layer: WsMapLayer) {
        this.layers.push(layer);
        this.addLayer$.emit(layer);
    }
    public removeLayer(layerName: string) {
        this.layers.forEach((layer: WsMapLayer) => {
            if (layer.name == layerName) {
                this.removeLayer$.emit(layer);
            }
        });
    }

    // Points
    public showPoints(points: WsMapPoint[], debug: boolean = false) {
        if (debug) { console.log('map.service: showPoints()', { points }); }
        this.addPoints$.emit(points);
    }
    public hidePoints(debug: boolean = false) {
        if (debug) { console.log('map.service: hidePoints()'); }
        this.removePoints.emit(undefined);
    }

    // Lines
    public showLines(lines: WsMapLine[], debug: boolean = false) {
        if (debug) { console.log('map.service: showLines()', { lines }); }
        this.addLines.emit(lines);
    }
    public hideLines(debug: boolean = false) {
        console.log('map.service: hideLines()');
        this.removeLines.emit(undefined);
    }

    // Polygons
    public showPolygons(polygons: WsMapPolygon[], debug: boolean = false) {
        if (debug) { console.log('map.service: showPolygons()', { polygons }); }
        this.showPolygons$.emit(polygons);
    }
    public hidePolygons(polygons: WsMapPolygon[], debug: boolean = false) {
        if (debug) { console.log('map.service: hidePolygons()', { polygons }); }
        this.hidePolygons$.emit(polygons);
    }
}