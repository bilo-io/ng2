// TAPI Specification: https://transit.whereismytransport.com/docs/default.html
import { Point, MultiPoint, LineString } from '../../shared/models/geojson.models';

export enum Mode {
    LightRail,
    Subway,
    Rail,
    Bus,
    Ferry,
    GroundCableCar,
    Gondola,
    Funicular,
    Coach,
    Air
}

export class Modes {
    constructor() {}
    public static getImageForMode(mode: string) {
         switch (mode) {
            case 'LightRail':
                return 'tram';
            case 'Subway':
                return 'directions_subway';
            case 'Rail':
                return 'directions_railway';
            case 'Bus':
                return 'directions_bus';
            case 'Ferry':
                return 'directions_boat';
            case 'GroundCableCar':
                return 'tram';
            case 'Gondola':
                return 'tram';
            case 'Funicular':
                return 'tram';
            case 'Coach':
                return 'directions_bus';
            case 'Air':
                return 'local_airport';
            case 'Walk':
            case 'Walking':
            case 'Pedestrian':
                return 'directions_walk';
            case 'Bike':
            case 'Bicycle':
                return 'directions_bike';
            default:
                return 'error_outline';
        }
    }
}

export enum TimeType {
    DepartAfter,
    ArriveBefore
}

export enum Profile {
    ClosestToTime,
    FewestTransfers
}

export class Agency {
    constructor(
        public id: string,
        public href: string,
        public name: string,
        public culture: string) { }
}

export class Direction {
    constructor(
        public instruction: string,
        public distance: Distance) { }
}

export class Distance {
    public stringValue: string;
    constructor(
        public value: number,
        public unit: string) {
            this.stringValue = this.getString();
        }
    
    public static toString(distance: Distance): string {
        let distanceString: string = '';
        if (distance.unit == 'm') {
            if (distance.value > 1000) {
                distanceString = '' + (distance.value / 1000).toFixed(1) + 'km';
            } else {
                distanceString = '' + distance.value + 'm';
            }
        }
        return distanceString;
    }
    public getString(): string {
        let distanceString: string = '';
        if (this.unit == 'm') {
            if (this.value > 1000) {
                distanceString = '' + this.value / 1000 + 'km';
            } else {
                distanceString = '' + this.value + 'm';
            }
        }
        return distanceString;
    }
}

export class Fare {
    constructor(
        public fareDescription: string,
        public fareProduct: FareProduct,
        public cost: Cost,
        public messages: string[]) { }
}

export class FareProduct {
    constructor(
        public id: string,
        public name: string,
        public isDefault: boolean,
        public description: string,
        public restrictions: string[]) { }
}

export class Cost {
    constructor(
        public amount: number,
        public currencyCode: string) { }
    getCostString() {
        if (this.currencyCode && this.amount) {
            return this.currencyCode + this.amount;
        }
        return '';
    }
    // getCurrencyString() {
    //     switch (this.currencyCode)
    //     {
    //         case 'ZAR': return 'R';
    //         case 'USD': return '$';
    //     }
    // }
}

export class Journey {
    // constructor(
    //     public id: string,
    //     public href: string,
    //     public geometry: MultiPoint[],
    //     public agencies: string[],
    //     public profile: string,
    //     public earliestDepartureTime: Date,
    //     public maxItineraries: number,
    //     public modes: TransitMode[],
    //     public coverage: string, // CSV
    //     public itineraries: Itinerary[]) { }
    public id: string;
    public href: string;
    public geometry: MultiPoint;
    public agencies: string[];
    public profile: string;
    public earliestDepartureTime: string;
    public maxItineraries: number;
    public modes: string[];
    public coverage: string;
    public itineraries: Itinerary[];
    constructor() { }
}

export class Itinerary {
    public id: string;
    public href: string;
    constructor(
        public departureTime: Date,
        public arrivalTime: Date,
        public distance: Distance,
        public duration: number,
        public legs: Leg[]) { }

    static getCost(trip: Itinerary): string {
        let totalCost: number = 0;
        let currency: string = '';

        trip.legs.forEach((leg) => {
            if (leg.fare && leg.fare.cost && leg.fare.cost.amount > 0) {
                totalCost += leg.fare.cost.amount;
            }
        });

        trip.legs.forEach((leg) => {
            if (leg.fare && leg.fare.cost && leg.fare.cost.currencyCode) {
                currency = leg.fare.cost.currencyCode;
            }
        });

        return '' + currency + '' + totalCost.toFixed(2);
    }

    static getModes(trip: Itinerary): string[] {
        let modes: string[] = [];
        trip.legs.forEach((leg: Leg) => {
            if (leg.type == 'Transit') {
                modes.push(leg.line.mode);
            } else {
                modes.push('Walking');
            }    
        });
        // console.log({ modes });
        return modes;
    }

    static getModeColors(trip: Itinerary): string[] {
        let modeColors: string[] = [];
        trip.legs.forEach((leg: Leg) => {
            if (leg.type === 'Transit') {
                modeColors.push(leg.line.colour);
            } else {
                modeColors.push('#7c7c7c');
            }
        });
        return modeColors;
    }

}

export class Leg {
    constructor(
        public type: string,
        public distance: Distance,
        public duration: number,
        public line: Line,
        public fare: Fare,
        public waypoints: Waypoint[],
        public directions: Direction[],
        public geometry: LineString) { }
}

export class Waypoint {
    constructor(
        public arrivalTime: Date,
        public departureTime: Date,
        public stop: Stop,
        public location: Location) { }

    public static getName(waypoint: Waypoint): string {
        if (waypoint.stop && waypoint.stop.name) {
            return waypoint.stop.name;
        } else if (waypoint.location && waypoint.location.address) {
            return waypoint.location.address;
        } else {
            return 'No_Address';
        }
    }
}

export class Line {
    constructor(
        public id: string,
        public agency: Agency,
        public name: string,
        public shortName: string,
        public description: string,
        public mode: string,
        public colour: string,
        public textColour: string,
        public shapes: LineShape[]) { }
}

export class LineShape {
    constructor(
        public departureStop: Stop,
        public arrivalStop: Stop,
        public geometry: LineString,
        public distance: Distance) { }
}

export class LineTimetable {
    constructor(
        public tripName: string,
        public direction: string,
        public headsign: string,
        public waypoints: Waypoint[]) { }
}

export class Location {
    constructor(
        public address: string,
        public geometry: Point) { }

    public static From(address: string, geometry: Point): Location {
        return new Location(address, geometry);
    }
}

export class Stop {
    constructor(
        public id: string,
        public agency: Agency,
        public name: string,
        public code: string,
        public geometry: Point) { }
}

export class StopTimetable {
    constructor(
        public stopId: string,
        public earliestArrivalTime: Date,
        public limit: number,
        public at: Date) { }
}