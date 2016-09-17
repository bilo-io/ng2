import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ws-checkbox',
    templateUrl: 'ws-checkbox.component.html',
    styleUrls: [
        'ws-checkbox.component.html',
        '../ws.style.css'
    ]
})
export class WsCheckboxComponent {
    @Input() wsName: string;
    @Input() wsValue: boolean;
    @Output() wsChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor() { }
}