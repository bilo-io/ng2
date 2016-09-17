import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Point } from '../../../models/geojson.models';
import { GeocoderService } from '../../../services/geocoder.service';
import { WsListComponent } from '../ws-list/ws-list.component';
import { WsItem } from '../ws.models'; 

export class WsPoint {
    constructor(
        public name: string,
        public point: Point) {
    }
}
@Component({
    moduleId: module.id,
    selector: 'ws-point',
    templateUrl: 'ws-point.component.html',
    styleUrls: [
        'ws-point.component.css',
        '../ws.style.css',
        '../../../../app.style.css',
        '../../../styles/materialize.override.css'
    ]
})
export class WsPointComponent {
    @Input() wsName: string;
    @Input() wsColor: string = '#00ADEE';
    @Input() wsOpacity: number = 1.0;
    @Input() wsPoint: Point;
    @Input() searchLat: number;
    @Input() searchLon: number;
    @Input() wsToggleEnabled: boolean = true;
    @Output() wsChanged$: EventEmitter<WsPoint> = new EventEmitter<WsPoint>();

    public searchText: string;
    public searchResults: WsPoint[] = [];
    public listItems: WsItem[] = [];
    public showingCoordinate: boolean = false;
    private geocoding: boolean = true;
    private isSearching;

    constructor(
        @Inject(GeocoderService) private geocoder: GeocoderService) {
    }

    ngAfterViewInit() {
        this.activateSearchInput();
    }

    ngOnChanges(changes) {
        if (changes.searchLat && changes.searchLon) {
            if (changes.searchLat.currentValue != changes.searchLat.previousValue ||
                changes.searchLon.currentValue != changes.searchLon.previousValue) {
                // console.log('ws-point.component: perform reverseGeocode');
                this.reverseGeocode(new Point([changes.searchLon.currentValue, changes.searchLat.currentValue]));
            }
        }
    }

    toggleInput() {
        console.log('Showing Coordinates: ' + this.showingCoordinate);
        this.showingCoordinate = !this.showingCoordinate;
        if (this.showingCoordinate) {
            this.activatePointInput();
        } else {
            this.activateSearchInput();
        }
    }

    activatePointInput() {
        this.showingCoordinate = true;
        this.geocoding = false;
        // if (this.wsToggleEnabled) {
        //     document.getElementById('search-icon-' + this.wsName).className = "material-icons ws-light-i";
        //     document.getElementById('point-icon-' + this.wsName).className = "material-icons ws-blue-i";
        // }
    }

    activateSearchInput() {
        this.showingCoordinate = false;
        this.geocoding = true;
        // if (this.wsToggleEnabled) {
        //     document.getElementById('search-icon-' + this.wsName).className = "material-icons ws-blue-i";
        //     document.getElementById('point-icon-' + this.wsName).className = "material-icons ws-light-i";
        // }
    }

    public searching() {
        return !this.searchText ? false :
            this.isSearching &&
            this.searchText.length > 0 &&
            this.searchResults.length > 0;
    }

    geocode(address) {
        console.log('Getting Coordinates for: ', address);
        if (this.searchText.length > 0) {
            this.isSearching = true;
            this.geocoder.addressToPoint(this.searchText).subscribe(
                response => {
                    this.processResponse(response.json());
                },
                error => {
                    console.log(error);
                },
                () => {
                });
        } else {
            this.isSearching = false;
        }
    }

    reverseGeocode(point) {
        // console.log('Getting Address for: ', point);

        if (Point.validLatLong(this.searchLat, this.searchLon)) {
            this.geocoder.addressFromPoint(point).subscribe(
                response => {
                    this.processResponse(response.json());
                    this.searchText = this.searchResults[0].name;
                    this.wsChanged$.emit(new WsPoint(this.searchText, point));
                },
                error => {
                    console.log(error);
                },
                () => {
                });
        } else {
            // console.log('invalid latlng');
        }
    }

    public updateLat(latitude) {
        this.searchLat = latitude;
        this.reverseGeocode(new Point([this.searchLon, this.searchLat]));
    }

    public updateLon(longitude) {
        this.searchLon = longitude;
        this.reverseGeocode(new Point([this.searchLon, this.searchLat]));
    }

    processResponse(obj: any) {
        this.searchResults = [];
        for (var i in obj.results) {
            this.searchResults.push(
                new WsPoint(obj.results[0].formatted_address,
                    new Point([
                        obj.results[0].geometry.location.lng,
                        obj.results[0].geometry.location.lat
                    ])
                )
            );
        }

        this.searchResults.forEach((location: WsPoint) => {
            this.listItems.push(new WsItem(location.name, location.point, undefined, false));
        });
    }

    selectResult(location: WsPoint) {
        this.searchText = location.name;
        this.searchLat = location.point.latitude();
        this.searchLon = location.point.longitude();
        this.isSearching = false;
        console.log('ws-point.component: wsChanged$:', location);
        this.wsChanged$.emit(location);
        // this.journeys.setLocation(new Location(location.name, new Point(location.point.coordinates)));
    }

    selectItem(item: WsPoint) {
        console.log({ item });
        this.searchText = item.name;
        this.searchLat = item.point.latitude();
        this.searchLon = item.point.longitude();
        this.isSearching = false;
        this.wsChanged$.emit(item);
    }
}