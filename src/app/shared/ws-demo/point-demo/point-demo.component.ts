import { Component, Inject } from '@angular/core';
import { WsPoint } from '../../ws/models';
import { WsPointComponent, WsMapComponent } from '../../ws/components';
import { WsMapService, WsMapPoint } from '../../ws/services';

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
        this.map.showPoints([new WsMapPoint(location.name, location.point, '#00ADEE')]);
    }
}
