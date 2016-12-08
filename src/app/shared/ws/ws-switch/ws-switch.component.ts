import { Component } from '@angular/core';
import template from './ws-switch.component.html!text';
import style from './ws-switch.component.css!text';
import wsStyle from '../scss/ws.css!text';


@Component({
    selector: 'ws-switch',
    template,
    styles: [ style, wsStyle ]
})
export class WsSwitchComponent {
    constructor() {}
}
