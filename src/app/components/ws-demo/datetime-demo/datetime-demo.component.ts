import { Component } from '@angular/core';
import { WsDateTimeComponent } from '../../../shared/ws/ws-datetime/ws-datetime.component';

@Component({
    moduleId: module.id,
    selector: 'datetime-demo',
    templateUrl: 'datetime-demo.component.html',
    styleUrls: ['datetime-demo.component.css'],
    directives: [
        WsDateTimeComponent
    ]
})
export class DateTimeDemoComponent {
    constructor() {}
}
