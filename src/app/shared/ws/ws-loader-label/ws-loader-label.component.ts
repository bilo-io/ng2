import { Component, Input } from '@angular/core';
import { WsLoaderComponent } from '../ws-loader/ws-loader.component';
import template from './ws-loader-label.component.html!text';
import style from './ws-loader-label.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-loader-label',
    template,
    styles: [ style, wsStyle ]
})
export class WsLoaderLabelComponent {
    @Input() public wsText: string = 'ws-loader-label component';
    constructor() {}
}
