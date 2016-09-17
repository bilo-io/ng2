import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { WsPointComponent, WsPoint } from '../ws-point/ws-point.component';
import { Point } from '../../../models/geojson.models';

@Component({
    moduleId: module.id,
    selector: 'ws-bbox',
    templateUrl: 'ws-bbox.component.html',
    styleUrls: ['ws-bbox.component.css'],
    directives: [
        WsPointComponent
    ]
})
export class WsBBoxComponent {
    @Output() change = new EventEmitter<string>();
    @Output() topLeftChanged$: EventEmitter<WsPoint> = new EventEmitter<WsPoint>();
    @Output() bottomRightChanged$: EventEmitter<WsPoint> = new EventEmitter<WsPoint>();

    public topLeft: Point;
    public bottomRight: Point;

    constructor() {
    }

    ngOnInit() {
        this.topLeft = new Point([18.9253, -33.4239]);
        this.bottomRight = new Point([18.9253, -33.4239]);
    }

    selectTopLeft(topLeftActive: boolean) {
    }

    updateTopLeft(point: WsPoint) {
        this.topLeftChanged$.emit(point);
    }

    updateBottomRight(point: WsPoint) {
        this.bottomRightChanged$.emit(point);
    }
}