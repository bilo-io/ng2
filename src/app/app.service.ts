import { Injectable, Inject } from '@angular/core';
import { MapService } from './shared/ws/ws-map/map.service';

@Injectable()
export class AppService {
    constructor(@Inject(MapService) public map: MapService) {}
} 