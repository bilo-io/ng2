import { Injectable, Output, EventEmitter } from '@angular/core';
import { Point, LineString, Polygon } from '../../models/geojson.models';
import { WsMapLayer, WsMapPoint, WsMapLine, WsMapPolygon } from './ws-map.models';

@Injectable()
export class WsMapService {
    public styles: string[] = [];
    public lines: any[] = [];
    public stops: any[] = [];
    public point: Point;
    public layers: WsMapLayer[] = [];

    @Output() addLayer$: EventEmitter<WsMapLayer> = new EventEmitter<WsMapLayer>();
    @Output() removeLayer$: EventEmitter<any> = new EventEmitter<any>();

    // Events going to MapComponent    
    @Output() focusPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStyle$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updatedPoint$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateStartPoint$: EventEmitter<WsMapPoint> = new EventEmitter<WsMapPoint>();
    @Output() updatedEndPoint$: EventEmitter<WsMapPoint> = new EventEmitter<WsMapPoint>();
    @Output() updateStartName$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateEndName$: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateCenter: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() updateBounds$: EventEmitter<Point[]> = new EventEmitter<Point[]>();

    
    @Output() addLines: EventEmitter<WsMapLine[]> = new EventEmitter<WsMapLine[]>();
    @Output() removeLines = new EventEmitter();
    @Output() addPoints$: EventEmitter<WsMapPoint[]> = new EventEmitter<WsMapPoint[]>();
    @Output() addCircles$: EventEmitter<WsMapPoint[]> = new EventEmitter<WsMapPoint[]>();
    @Output() removePoints = new EventEmitter();
    @Output() showPolygons$: EventEmitter<WsMapPolygon[]> = new EventEmitter<WsMapPolygon[]>();
    @Output() hidePolygons$: EventEmitter<WsMapPolygon[]> = new EventEmitter<WsMapPolygon[]>();
    
    // Events coming from MapComponent    
    @Output() didClickStartMarker$ = new EventEmitter();
    @Output() didClickEndMarker$ = new EventEmitter();
    @Output() didMoveStartMarker$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() didMoveEndMarker$: EventEmitter<Point> = new EventEmitter<Point>();
    @Output() didMove$: EventEmitter<any> = new EventEmitter();



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
    
    public setPoint(point: Point) {
        // console.log('Point:', point);
        this.point = point;
        this.updatedPoint$.emit(this.point);
    }
}