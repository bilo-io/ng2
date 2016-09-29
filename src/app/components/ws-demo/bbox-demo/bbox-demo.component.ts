import { Component, Inject } from '@angular/core';
import { WsBBoxComponent } from '../../../shared/ws/ws-bbox/ws-bbox.component';
import { WsPoint } from '../../../shared/ws/ws-point/ws-point.component';
import { MapComponent } from '../../../shared/ws/ws-map/map.component';
import { MapService, MapPoint } from '../../../shared/ws/ws-map/map.service';

@Component({
    moduleId: module.id,
    selector: 'bbox-demo',
    templateUrl: 'bbox-demo.component.html',
    styleUrls: ['bbox-demo.component.css'],
    directives: [
        WsBBoxComponent,
        MapComponent
    ]
})
export class BBoxDemoComponent {
    constructor( @Inject(MapService) public map: MapService) { }
    
    updateTopLeft(point: WsPoint) {
        let mapPoint: MapPoint = new MapPoint('TopLeft: ' + point.name, point.point, '#00ADEE');
        this.map.showPoints([mapPoint]);
        this.map.panToPoint$.emit(point.point);
        // this.map.fitBounds$.emit([])
    }

    updateBottomRight(point: WsPoint) {
        let mapPoint: MapPoint = new MapPoint('BottomRight: ' + point.name, point.point, '#00ADEE');
        this.map.showPoints([mapPoint]);
        this.map.panToPoint$.emit(point.point);
    }
}
