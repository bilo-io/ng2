import { Component } from '@angular/core';
import { WsDateTimeComponent } from '../../ws/components';

@Component({
    moduleId: module.id,
    selector: 'datetime-demo',
    templateUrl: 'datetime-demo.component.html',
    styleUrls: [
        'datetime-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class DateTimeDemoComponent {
    constructor() {}
}
