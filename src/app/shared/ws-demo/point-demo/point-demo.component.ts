import { Component, Inject } from '@angular/core';
import { WsPoint } from '../../ws/models';
import { WsPointComponent, WsMapComponent } from '../../ws/components';
import { WsMapService, WsMapPoint } from '../../ws/services';
import template from './point-demo.component.html!text';
import style from './point-demo.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'point-demo',
    template,
    styles: [ style, wsDemoStyle ]
})
export class PointDemoComponent {
    constructor( @Inject(WsMapService) public map: WsMapService) { }

    updateLocation(location: WsPoint) {
        console.log('Point Demo: updatingLocation:', location);
        this.map.showPoints([new WsMapPoint(location.name, location.point, '#00ADEE')]);
    }
}
