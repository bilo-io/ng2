export class Agency {
    constructor(
        public id: string,
        public name: string,
        public url: string,
        public timezone: string,
        public lang: string,
        public phone: string,
        public fareUrl: string,
        public email: string
    ) { }
}

export class Stops {
    constructor(
        public id: string,
        public code: string,
        public name: string,
        public desc: string,
        public lat: number,
        public lon: number,
        public zoneId: string,
        public url: string,
        public locationType: string,
        public parentStation: string,
        public stopTimeZone: string,
        public wheelChairBoarding: string
    ) {
    }
}

export class Routes {

}

export class Trips {

}

export class StopTimes {

}

export class Calendar {

}

export class CalendarDates {

}

export class FareAttributes {

}

export class FareRules {

}

export class Shapes {

}

export class Frequencies {

}

export class Transfers {

}

export class FeedInfo {

}