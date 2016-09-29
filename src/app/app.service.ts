import { Injectable, Inject } from '@angular/core';
import { WsMapService } from './shared/ws/ws-map/ws-map.service';

@Injectable()
export class AppService {
    constructor(@Inject(WsMapService) public map: WsMapService) {}
} 