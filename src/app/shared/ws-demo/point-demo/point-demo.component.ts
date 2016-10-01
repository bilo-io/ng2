import { Component, Inject } from '@angular/core';
import { WsPointComponent, WsPoint } from '../../ws/ws-point/ws-point.component';
import { WsMapComponent } from '../../ws/ws-map/ws-map.component';
import { WsMapService, MapPoint } from '../../ws/ws-map/ws-map.service';

@Component({
    moduleId: module.id,
    selector: 'point-demo',
    templateUrl: 'point-demo.component.html',
    styleUrls: [
        'point-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class PointDemoComponent {
    constructor( @Inject(WsMapService) public map: WsMapService) { }

    updateLocation(location: WsPoint) {
        console.log('Point Demo: updatingLocation:', location);
        this.map.showPoints([new MapPoint(location.name, location.point, '#00ADEE')]);
    }
}
