import { Component, Inject } from '@angular/core';
import { WsPointComponent, WsPoint } from '../../../shared/components/ws/ws-point/ws-point.component';
import { MapComponent } from '../../../shared/components/map/map.component';
import { MapService, MapPoint } from '../../../shared/components/map/map.service';

@Component({
    moduleId: module.id,
    selector: 'point-demo',
    templateUrl: 'point-demo.component.html',
    styleUrls: ['point-demo.component.css']
})
export class PointDemoComponent {
    constructor(@Inject(MapService) public map: MapService) { }
    
    updateLocation(location: WsPoint) {
        console.log('Point Demo: updatingLocation:', location);
        this.map.showPoints([new MapPoint(location.name, location.point, '#00ADEE')]);
    }
}
