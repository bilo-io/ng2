import { Component, Inject } from '@angular/core';
import { WsPoint } from '../../ws/models';
import { WsBBoxComponent, WsMapComponent } from '../../ws/components';
import { WsMapService } from '../../ws/ws-map/ws-map.service';
import { WsMapPoint } from '../../ws/ws-map/ws-map.models';

@Component({
    moduleId: module.id,
    selector: 'bbox-demo',
    templateUrl: 'bbox-demo.component.html',
    styleUrls: [
        'bbox-demo.component.css',
            '../ws-demo.component.css'
    ]
})
export class BBoxDemoComponent {
    constructor( @Inject(WsMapService) public map: WsMapService) { }
    
    updateTopLeft(point: WsPoint) {
        let mapPoint: WsMapPoint = new WsMapPoint('TopLeft: ' + point.name, point.point, '#00ADEE');
        this.map.addPoints$.emit([mapPoint]);
        this.map.updateCenter.emit(point.point);
        // this.map.fitBounds$.emit([])
    }

    updateBottomRight(point: WsPoint) {
        let mapPoint: WsMapPoint = new WsMapPoint('BottomRight: ' + point.name, point.point, '#00ADEE');
        this.map.addPoints$.emit([mapPoint]);
        this.map.updateCenter.emit(point.point);
    }
}
