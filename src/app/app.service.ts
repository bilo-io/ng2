import { Injectable, Inject, EventEmitter } from '@angular/core';
import { WsMapService } from './shared/ws/ws-map/ws-map.service';
import { WsToastService } from './shared/ws/ws-toast/ws-toast.service';
import { TapiService } from './api/tapi/tapi.service';
import { Line } from './api/tapi/tapi.models';
import { settings, ENVS, Environment } from './api/api.envs';

@Injectable()
export class AppService {
    private environment: Environment;
    public updatedAgencies$ = new EventEmitter();
    public updatedStops$ = new EventEmitter();
    public updatedLines$ = new EventEmitter();
    public updatedLineShape$: EventEmitter<Line> = new EventEmitter<Line>();
    public updatedLineShapes$: EventEmitter<any> = new EventEmitter();
    constructor(
        @Inject(WsMapService) public map: WsMapService,
        @Inject(TapiService) public tapi: TapiService,
        @Inject(WsToastService) public toaster: WsToastService) {

        this.setEnvironment('prod');
        this.tapi.gotNewToken$.subscribe(token => {
            this.toaster.success('Received token');
        });
    }

    public setEnvironment(environmentName: string) {
        this.environment = ENVS[environmentName.toLocaleLowerCase()];
        this.tapi.setEnvironment(this.environment);
    }
} 