import { Inject, Injectable } from '@angular/core';
import { ApiService } from  '../api.service';
import { Point } from '../../shared/models/geojson.models';

//https://developer.uber.com/docs/rides/getting-started

@Injectable()
export class UberService {

    private uberApiUrl: string = 'https://api.uber.com/v1';
    private uberServerToken: string = 'TAbRenlQH4xWld-QeTgGBdReRqgK1WuJJQA-nxlW';
    
    constructor( @Inject(ApiService) private api: ApiService) { 
        // this.GETProductsForPoint(new Point([-18.4241, 33.9249]));
    }

    GETUberToken() {
        //https://developer.uber.com/docs/rides/tutorials-rides-api
    }
    
    GETProductsForPoint(point: Point) {
        console.log('Getting UBER Products');

        this.api.GET(this.uberApiUrl, 'products', {
            'server_token': this.uberServerToken,
            'latitude': point.latitude(),
            'longitude': point.longitude()
        }, this.api.defaultHeaders()).subscribe(
            (response) => {
                console.log(response.json());
            }
        );
    }
}