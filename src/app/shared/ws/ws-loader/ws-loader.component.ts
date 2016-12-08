import { Component, Input } from '@angular/core';
import template from './ws-loader.component.html!text';
import style from './ws-loader.component.css!text';
import wsStyle from '../scss/ws.css!text';
//http://projects.lukehaas.me/css-loaders/
@Component({
    selector: 'ws-loader',
    template,
    styles: [ style, wsStyle ]
})
export class WsLoaderComponent {
    @Input() color: string;
    @Input() wsName: string = 'arc-stretch';
    constructor() {
    }
}