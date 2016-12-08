import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './ws-toggle.component.html!text';
import style from './ws-toggle.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-toggle',
    template,
    styleUrls: [ style, wsStyle ]
})
export class WsToggleComponent {
    @Input() wsName: string;
    @Input() wsValue: boolean;
    @Output() wsChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }
}