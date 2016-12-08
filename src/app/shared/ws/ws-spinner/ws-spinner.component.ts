import { Component } from '@angular/core';
import template from './ws-spinner.component.html!text';
import style from './ws-spinner.component.css!text';
import wsStyle from '../scss/ws.css!text';
@Component({
    selector: 'ws-spinner',
    template,
    styles: [ style, wsStyle ]
})
export class WsSpinnerComponent {
    constructor() {
    }
}