import { Injectable, Inject } from '@angular/core';
import { MapService } from './shared/components/map/map.service';

@Injectable()
export class AppService {
    constructor(@Inject(MapService) public map: MapService) {}
} 