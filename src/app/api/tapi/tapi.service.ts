import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Agency, Line, LineShape, LineTimetable, Stop, Journey, Itinerary, Leg, Waypoint } from './tapi.models';
import { Point } from '../../shared/models/geojson.models';
import { ApiService, IParams } from '../../api/api.service';
import { AppService } from '../../app.service';

@Injectable()
export class TapiService {
    token: string;
    public error$: EventEmitter<any> = new EventEmitter();
    public gotNewToken$: EventEmitter<any> = new EventEmitter<any>();
    public updatedAgencies$: EventEmitter<any> = new EventEmitter<any>();
    // Environment
    public environmentName: string;
    public identityUrl: string;
    public clientId: string;
    public clientSecret: string = 'fg+b4JlzSr6KlSORAJ9k3n3ZNkFXYChvsiqr8XOE5XA=';
    public grantType: string = 'client_credentials';
    public scope: string;
    public tapiUrl: string;

    constructor( @Inject(ApiService) private api: ApiService) { 
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.api.tokenUpdated$.subscribe((token) => {
            this.gotNewToken$.emit(token.access_token);
            let timeout: number = token.expires_in;
            
            setTimeout(() => {
                this.getTapiToken();
            }, timeout * 1000);
        });
    }
    
    setEnvironment(env: any) {
        this.environmentName = env.envName;
        this.identityUrl = env.identitySts;
        this.tapiUrl = env.transitApi;
        this.scope = env.scope;
        this.clientId = env.clientId;
        this.getTapiToken();
    }

    getTapiToken() {
        var params = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'grant_type': this.grantType,
            'scope': this.scope 
        };
        this.api.getToken(this.identityUrl, 'connect/token', params);
        console.log('Request Token: ' + this.environmentName, params);
    }

    public getAgencies(params: IParams = undefined) {
        return this.api.GET(this.tapiUrl, 'agencies', params, this.api.defaultHeaders());
    }
    public getAgenciesByBBox(bbox: string) {
        return this.api.GET(this.tapiUrl, 'agencies', { bbox }, this.api.defaultHeaders());
    }

    public getLines(params: IParams = undefined) {
        return this.api.GET(this.tapiUrl, 'lines', params, this.api.defaultHeaders());
    }

    public getLineShape(lineId: string) {
        return this.api.GET(this.tapiUrl, `lines/${lineId}/shape`, [], this.api.defaultHeaders());
    }

    public getStops(params: IParams = undefined) {
        return this.api.GET(this.tapiUrl, 'stops', params, this.api.defaultHeaders());
    }

    public getStopsByAgencies(agencies: string[]) {
        return this.api.GET(this.tapiUrl, `stops` + (agencies.length > 0 ? `?agencies=${agencies.join()}` : ``), [], this.api.defaultHeaders());
    }

    public getStopsByBBox(bbox: string) {
        return this.api.GET(this.tapiUrl, `stops?bbox=${bbox}`, [], this.api.defaultHeaders());
    }

    public getLineTimetable(line: Line) {
        return this.api.GET(this.tapiUrl, `lines/${line.id}/timetables`, [], this.api.defaultHeaders());
    }

    public getStopTimetable(stop: Stop) {
        // return this.api.GET(this.tapiUrl, `stop/${stop.id}`,[], this.api.defaultHeaders());
    }

    public postJourneys(body: any) {
        return this.api.POST(this.tapiUrl, 'journeys', [], this.api.defaultHeaders(), body);
    }
}
