import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Point } from '../models/geojson.models';

@Injectable()
export class GeocoderService {

    private geocodeUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?';

    constructor(@Inject(Http) private http: Http) {
    }

    public addressFromPoint(point: Point) {
        let url: string = this.geocodeUrl + 'latlng=' + encodeURIComponent(point.latLong());
        console.log(url);
        return this.http.get(url);
    }

    public addressToPoint(address: string) {
        let url: string = this.geocodeUrl + 'address=' + encodeURIComponent(address);
        console.log(url);
        return this.http.get(url);
    }
    
    private testGeocoderService() {
        this.testGeocoding();
        this.testReverseGeocoding();
    }

    private testGeocoding() {
        this.addressToPoint('22 Jarvis Street')
            .subscribe(
            response => console.log(response),
            error => console.log('could not get point'),
            () => { }
            );
    }

    private testReverseGeocoding() {
        this.addressFromPoint(new Point([18.4606, -33.9575]))
            .subscribe(
            response => console.log(response),
            error => console.log('could not get address'),
            () => console.log('done reverse-geocoding')
            );
    }
}