import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ws-input',
    templateUrl: 'ws-input.component.html',
    styleUrls: [ 'ws-input.component.css']
})
export class WsInputComponent {
    @Input() wsType: string;
    constructor() {
    }
}
