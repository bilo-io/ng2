import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ws-toggle',
    templateUrl: 'ws-toggle.component.html',
    styleUrls: [
        'ws-toggle.component.css',
        '../ws.style.css'
    ]
})
export class WsToggleComponent {
    @Input() wsName: string;
    @Input() wsValue: boolean;
    @Output() wsChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }
}