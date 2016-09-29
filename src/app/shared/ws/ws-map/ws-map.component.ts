import { Component, Inject, Input, Output } from '@angular/core';
import { Point, LineString, Polygon } from '../../models/geojson.models';
import { WsMapService, MapState, MapPoint, MapLine, MapPolygon, MapLayer, MapLayerType } from './ws-map.service';
import * as L from 'leaflet';

@Component({
    moduleId: module.id,
    selector: 'ws-map',
    templateUrl: 'ws-map.component.html',
    styleUrls: [
        'ws-map.component.css',
        '../../../app.style.css'
    ]
})
export class MapComponent {
    @Input() mapStyle: string;
    public id: string;
    // public mapBoundsZoom: L.BoundsZ
    public accessToken: string = 'pk.eyJ1IjoiYmlsb2x3YWJvbmEiLCJhIjoiY2lmcDVpOW90MDFncnRlbHgwZXN1bDVsciJ9.iIMCbu4WnvsBgsGsChtY2Q';
    public map: L.Map;
    public mapBounds: L.LatLngBounds;
    public tileLayer: L.TileLayer;
    public lines: L.Polyline[] = [];
    public points = [];
    public polygons: L.Polygon[] = [];

    private markerLayer: any[] = [];
    private lineLayers: any[] = [];
    private pointLayers: any[] = [];
    private layers: MapLayer[] = [];
    // Marker Icons
    public markerPinRed: any = {};
    public markerPinGreen: any = {};
    public markerPinBlue: any = {};
    public markerDot: any = {};
    // Marker Objects
    public markerStart: any = {};
    public markerEnd: any = {};

    constructor( @Inject(WsMapService) public mapService: WsMapService) { }

    //{ Initialisation    
    ngOnInit() {
        this.initMap(this.mapStyle);
        this.subscribeToEvents();
    }

    private initMap(style: string = 'streets') {
        let mapStyle: string = localStorage.getItem('wingman-map-style');

        // set style
        if (mapStyle && mapStyle.length > 0) {
            this.mapStyle = mapStyle;
            style = this.mapStyle;
        } else {
            localStorage.setItem('wingman-map-style', style);
            style = this.mapStyle;
        }

        // Map Layer(s)
        this.tileLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/mapbox.${style}/{z}/{x}/{y}.png?access_token=${this.accessToken}`, {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
        });

        // Map Configuration
        if (!this.map) {
            this.map = new L.Map('mapid', {
                zoomControl: false,
                
            });
        }
        this.map.addLayer(this.tileLayer);
        // this.mapBounds = L.latLngBounds(localStorage.getItem('wingman-map-bounds'));
        if (this.mapBounds) {
            this.map.setView(this.mapBounds.getCenter());
        } else {
            this.map.setView([-25.9518, 28.1821], 11);
        }    
        this.initCustomMarkers();
        this.initLeafletEventListeners();
    }

    refreshMap(style: string = 'light') {
        if (this.map) {
            this.mapBounds = this.map.getBounds();
            localStorage.setItem('wingman-map-bounds', this.mapBounds.toBBoxString());
            this.map.removeLayer(this.tileLayer);
            this.initMap(style);
            this.lines.forEach(line => {
                this.map.addLayer(line);
            });

            this.points.forEach(point => {
                this.map.addLayer(point);
            });
        }
    }

    private initCustomMarkers() {
        let pinSize = [32, 32];
        let pinAnchor = [16, 32];

        L.Icon.Default.imagePath = 'app/shared/ws/ws-map/ws-map-markers';
        this.markerPinGreen = L.icon({
            iconUrl: L.Icon.Default.imagePath + '/map-pin-green.png',
            shadowUrl: L.Icon.Default.imagePath + '/marker-shadow.png',
            iconSize: [32, 32],
            shadowSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        this.markerPinBlue = L.icon({
            iconUrl: L.Icon.Default.imagePath + '/map-pin-blue.png',
            shadowUrl: L.Icon.Default.imagePath + '/marker-shadow.png',
            iconSize: [32, 32],
            shadowSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        this.markerPinRed = L.icon({
            iconUrl: L.Icon.Default.imagePath + '/map-pin-red.png',
            shadowUrl: L.Icon.Default.imagePath + '/marker-shadow.png',
            iconSize: [32, 32],
            shadowSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        this.markerDot = L.icon({
            iconUrl: L.Icon.Default.imagePath + '/marker-icon.png',
            shadowUrl: L.Icon.Default.imagePath + '/marker-shadow.png',
            iconSize: [16, 16],
            shadowSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [8, -16]
        });
    }

    private initLeafletEventListeners() {
        // reference: 
        // - overview:  http://leafletjs.com/reference.html#events
        // - eventlist: http://leafletjs.com/reference.html#click
        this.map.on('click', this.clicked.bind(this));
        this.map.on('moveend', this.moved.bind(this));
    }

    private subscribeToEvents() {
        // Map Style
        this.mapService.updateStyle$.subscribe((style: string) => {
            this.refreshMap(style);
        });

        // Map Actions
        this.mapService.panToPoint$.subscribe((point: Point) => {
            this.panTo(point);
        });
        this.mapService.fitBounds$.subscribe((points: Point[]) => {
            console.log('map.component: TODO => create fitBounds() event handler');
        });

        // Points
        this.mapService.addPoints$.subscribe((points: MapPoint[]) => {
            this.removePoints();
            this.addPoints(points);
        });
        this.mapService.removePoints.subscribe(() => {
            this.removePoints();
        });
        this.mapService.updateStartPoint$.subscribe((point: MapPoint) => {
            this.addMarkerStart(point.point, point.name, this.markerPinGreen);
        });
        this.mapService.updatedEndPoint$.subscribe((point: MapPoint) => {
            this.addMarkerEnd(point.point, point.name, this.markerPinRed);
        });

        // Lines
        this.mapService.addLines.subscribe((lines: MapLine[]) => {
            this.addLines(lines, true);
        });
        this.mapService.removeLines.subscribe(() => {
            this.removeLines();
        });

        // Polygons
        this.mapService.showPolygons$.subscribe((polygons: MapPolygon[]) => {
            this.addPolygons(polygons);
        });
    }
    //}

    //{ Lines    
    addLines(lines: MapLine[], log: boolean = false) {
        // this.lines = [];
        if (log) {
            console.log('map: addLines()', { lines });
        }

        lines.forEach((line) => {
            let options:L.PolylineOptions = {
                color: line.color, 
                fillOpacity: line.alpha, 
                opacity: line.alpha,
                weight: 5
            };
            if (line.dotted) {
                options.stroke = line.dotted;
                options.dashArray = '5, 10';
            }
            let polyline = L.polyline(this.toLatLngFromLineString(line.line), options);

            this.lines.push(polyline);
            this.map.addLayer(this.lines[this.lines.length - 1]);
        });
        // console.log({ bounds });

        let polyLines: L.Polyline[] = [];
        this.lines.forEach((line: L.Polyline) => {
            polyLines.push(line);
        });
        // this.map.fitBounds(L.featureGroup(polyLines).getBounds());
    }

    removeLines() {
        this.lines.forEach(lineLayer => {
            this.map.removeLayer(lineLayer);
        });
    }
    //}    

    //{ Points    
    addPoints(points: MapPoint[], log: boolean = false) {
        if (log) { console.log('map.component: addPoints()', { points }); }
        let bounds: L.LatLng[] = [];
        this.points = [];
        points.forEach((mapPoint) => {
            let marker = this.addCircle(mapPoint, mapPoint.color);
            marker.bindPopup(mapPoint.name);
            bounds.push(L.latLng(mapPoint.point.coordinates[1], mapPoint.point.coordinates[0]));

            this.points.push(marker);
            this.map.addLayer(marker);
        });
        this.map.fitBounds(L.latLngBounds(bounds));
    }
    addCircle(mapPoint: MapPoint, color: string) {
        let marker = L.circleMarker(
            [mapPoint.point.coordinates[1], mapPoint.point.coordinates[0]],
            {
                fillColor: color,
                fillOpacity: 1.0,
                color: '#ffffff',
                stroke: true,
                radius: 8,
            }
        );
        return marker;
    }
    removePoints() {
        this.points.forEach(point => {
            this.map.removeLayer(point);
        });
    }

    private addMarkerStart(point: Point, name?: string, markerIcon: any = this.markerDot) {
        if (this.markerStart) {
            this.map.removeLayer(this.markerStart);
            this.markerStart = undefined;
        }
        this.markerStart = L.marker([
            point.coordinates[1],
            point.coordinates[0]
        ],
            { icon: markerIcon, draggable: true }
        );
        this.markerStart.bindPopup(name ? name : 'start');
        this.markerStart.on('dragend', this.movedStartMarker.bind(this));
        this.markerStart.on('click', () => {
            this.mapService.didClickStartMarker$.emit(undefined);
        });
        this.markerStart.on('mousedown', () => {
            this.mapService.didClickStartMarker$.emit(undefined);
        });
        this.map.addLayer(this.markerStart);
        // this.panTo(point);
    }
    private addMarkerEnd(point: Point, name?: string, markerIcon: any = this.markerDot) {
        if (this.markerEnd) {
            this.map.removeLayer(this.markerEnd);
        }
        this.markerEnd = L.marker([
            point.coordinates[1],
            point.coordinates[0]
        ],
            { icon: markerIcon, draggable: true }
        );
        this.markerEnd.bindPopup(name ? name : 'end');
        this.markerEnd.on('dragend', this.movedEndMarker.bind(this));
        this.markerEnd.on('click', () => {
            this.mapService.didClickEndMarker$.emit(undefined);
        });
        this.markerEnd.on('mousedown', () => {
            this.mapService.didClickEndMarker$.emit(undefined);
        });
        this.map.addLayer(this.markerEnd);
        // this.panTo(point);
    }
    private movedStartMarker(e) {
        let point: Point = new Point([e.target.getLatLng().lng, e.target.getLatLng().lat]);
        console.log('moved start marker', point.coordinates);
        this.mapService.didMoveStartMarker$.emit(point);
    }
    private movedEndMarker(e) {
        let point: Point = new Point([e.target.getLatLng().lng, e.target.getLatLng().lat]);
        console.log('moved end marker', e.latlng, point.coordinates);
        this.mapService.didMoveEndMarker$.emit(point);
    }
    //}

    //{ Polygons
    addPolygons(polygons: MapPolygon[], log: boolean = false) {
        if (log) { console.log('map: addPolygons()', { polygons }); }
        polygons.forEach((mapPolygon) => {
        });
    }

    removePolygons() {
        this.polygons.forEach(polygon => {
            this.map.removeLayer(polygon);
        })
    }
    //}    

    //{ Leaflet    
    clicked(e) {
        let newPoint: Point = new Point([e.latlng.lng, e.latlng.lat]);
        console.log('Clicked: ', newPoint.coordinates);
        this.mapService.setPoint(newPoint);
    }

    moved(e) {
        console.log('MapBounds', this.map.getBounds());
        let mapBounds = {
            northEast: new Point([this.map.getBounds().getNorthEast().lng, this.map.getBounds().getNorthEast().lat]),
            southWest: new Point([this.map.getBounds().getSouthWest().lng, this.map.getBounds().getSouthWest().lat])
        };
        this.mapBounds = this.map.getBounds();
        localStorage.setItem('wingman-map-bounds', this.mapBounds.toBBoxString());
        this.mapService.moved$.emit(mapBounds);
    }

    panTo(point: Point) {
        this.map.panTo(new L.LatLng(point.latitude(), point.longitude()));
    }

    fitBounds(points: Point[]) {
        let latlngs: L.LatLng[] = [];
        points.forEach((point: Point) => {
            latlngs.push(new L.LatLng(point.latitude(), point.longitude()));
        });
        let bounds = new L.LatLngBounds(latlngs);
        this.map.fitBounds(bounds);
    }
    //}

    //{ Helpers    
    toLatLng(coordinates: number[]) {
        return [coordinates[1], coordinates[0]];
    }

    toLatLngFromLineString(line: LineString) {
        let latlngs: number[][] = [];
        for (let i in line.coordinates) {
            latlngs.push(this.toLatLng(line.coordinates[i]));
        }
        return latlngs;
    }

    toLatLngFromPolygon(polygon: Polygon) {
        let latlngs: number[][][] = [];
        for (let i in polygon.coordinates) {
            latlngs[i] = [];
            for (let j in polygon.coordinates[i]) {
                latlngs[i].push(this.toLatLng(polygon.coordinates[i][j]));
            }
        }
        return latlngs;
    }

    removeMarkers() {
        this.markerLayer.forEach((marker) => {
            this.map.removeLayer(marker);
        });
    }

    removeAlpha(hexColor: string): string {
        return '#' + hexColor.substr(3, 6)
    }
    //} 
}