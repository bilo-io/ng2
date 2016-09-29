import { Injectable, Output, EventEmitter } from '@angular/core';
import { Point, LineString, Polygon } from '../../models/geojson.models';

export enum MapState {
    Journeys,
    Transit,
    Realtime,
    Simulator
}
export class MapLine {
    constructor(
        public color: string,
        public line: LineString,
        public alpha: number = 1.0,
        public dotted: boolean = false) { }
}
export class MapPoint {
    constructor(
        public name: string,
        public point: Point,
        public color: string) { }
}
export class MapPolygon {
    constructor(
        public color: string,
        public polygon: Polygon) { }
}
export class MapLayer {
    constructor(
        public name: string,
        public type: MapLayerType,
        public data: any) { }
}
export enum MapLayerType {
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
    public layers: MapLayer[] = [];

    @Output() addLayer$: EventEmitter<MapLayer> = new EventEmitter<MapLayer>();
    @Output() removeLayer$: EventEmitter<any> = new EventEmitter<any>();

    @Output() focusPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStyle$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updatedPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStartPoint$: EventEmitter<MapPoint> = new EventEmitter<MapPoint>();
    @Output() updatedEndPoint$: EventEmitter<MapPoint> = new EventEmitter<MapPoint>();
    @Output() updateStartName$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateEndName$: EventEmitter<string> = new EventEmitter<string>();

    @Output() didClickStartMarker$ = new EventEmitter();
    @Output() didMoveStartMarker$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() didClickEndMarker$ = new EventEmitter();
    @Output() didMoveEndMarker$: EventEmitter<Point> = new EventEmitter<Point>();

    @Output() addLines: EventEmitter<MapLine[]> = new EventEmitter<MapLine[]>();
    @Output() removeLines = new EventEmitter();
    @Output() addPoints$: EventEmitter<MapPoint[]> = new EventEmitter<MapPoint[]>();
    @Output() addCircles$: EventEmitter<MapPoint[]> = new EventEmitter<MapPoint[]>();
    @Output() removePoints = new EventEmitter();
    @Output() showPolygons$: EventEmitter<MapPolygon[]> = new EventEmitter<MapPolygon[]>();
    @Output() hidePolygons$: EventEmitter<MapPolygon[]> = new EventEmitter<MapPolygon[]>();

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
    public addLayer(layer: MapLayer) {
        this.layers.push(layer);
        this.addLayer$.emit(layer);
    }
    public removeLayer(layerName: string) {
        this.layers.forEach((layer: MapLayer) => {
            if (layer.name == layerName) {
                this.removeLayer$.emit(layer);
            }
        });
    }

    // Points
    public showPoints(points: MapPoint[], debug: boolean = false) {
        if (debug) { console.log('map.service: showPoints()', { points }); }
        this.addPoints$.emit(points);
    }
    public hidePoints(debug: boolean = false) {
        if (debug) { console.log('map.service: hidePoints()'); }
        this.removePoints.emit(undefined);
    }

    // Lines
    public showLines(lines: MapLine[], debug: boolean = false) {
        if (debug) { console.log('map.service: showLines()', { lines }); }
        this.addLines.emit(lines);
    }
    public hideLines(debug: boolean = false) {
        console.log('map.service: hideLines()');
        this.removeLines.emit(undefined);
    }

    // Polygons
    public showPolygons(polygons: MapPolygon[], debug: boolean = false) {
        if (debug) { console.log('map.service: showPolygons()', { polygons }); }
        this.showPolygons$.emit(polygons);
    }
    public hidePolygons(polygons: MapPolygon[], debug: boolean = false) {
        if (debug) { console.log('map.service: hidePolygons()', { polygons }); }
        this.hidePolygons$.emit(polygons);
    }
}