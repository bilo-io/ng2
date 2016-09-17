import { Injectable } from '@angular/core';

@Injectable()
export class DistanceService {
    constructor() { }
    
    public distanceFromMeters(meters: number): string {
        let distanceString: string = '';        
        if (meters > 1000) {
            distanceString = `${meters/1000}km`
        } else {
            distanceString = `${meters}m`;
        }
        return distanceString;
    }
}