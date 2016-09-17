// built according to the GeoJson Specification:
// http://geojson.org/geojson-spec.html

export interface IGeoJson {
    type: string;
}

export class Point implements IGeoJson {
    public type: string = 'Point';
    constructor(public coordinates:number[] = []){}
    
    latitude() { return this.coordinates[1]; }
    longitude() { return this.coordinates[0]; }
    public LatLng():number[] { return [this.coordinates[1], this.coordinates[0]] };
    public LngLat():number[] { return [this.coordinates[0], this.coordinates[1]] };
    latLong() { return `${this.latitude()},${this.longitude()}`; }
    longLat() { return `${this.longitude()},${this.latitude()}`; }
    
    isValid() {
        return this.coordinates.length == 2 && Point.validPoint(this);
    }

    static validLatLong(latitude:number,longitude:number) {
        return latitude <= 90 && latitude >= -90 &&
               longitude <= 180 && longitude >= -180;  
    }
    static validPoint(point:Point) {
        return Point.validLatLong(point.latitude(), point.longitude());
    }
}

export class MultiPoint implements IGeoJson {
    public type: string = 'MultiPoint';
    constructor(public coordinates: number[][] = []){
    }
}

export class LineString implements IGeoJson {
    public type: string = "LineString";
    constructor(public coordinates:number[][] = []){
    }
}

export class MultiLineString implements IGeoJson {
    public type: string = 'MultiLineString';
    constructor(public coordinates: number[][][] = []){}
}

export class Polygon implements IGeoJson {
    public type:string = 'Polygon';
    constructor(public coordinates:number[][][] = []){}
}

export class BoundingBox implements IGeoJson {
    public type: string = 'Feature';
    constructor(public bbox: number[] = [],
                public geometry: Polygon){
    }
}

export class MultiPolygon implements IGeoJson {
    public type: string = 'MultiPolygon';
    constructor(public coordinates: number[][][][]){}
}

export class GeometryCollection implements IGeoJson {
    public type: string = 'GeometryCollection';
    constructor(public geometries: IGeoJson[]){}
}
