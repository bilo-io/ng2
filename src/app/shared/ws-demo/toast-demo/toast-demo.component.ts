import { Component, Inject } from '@angular/core';
import { WsToastComponent } from '../../ws/components';
import { WsToastService } from '../../ws/services';
import template from './toast-demo.component.html!text';
import style from './toast-demo.component.css!text';
import wsStyle from '../../ws/scss/ws.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'toast-demo',
    template,
    styles: [ style, wsStyle, wsDemoStyle ]
})
export class ToastDemoComponent {
    constructor(@Inject(WsToastService) public toaster: WsToastService) {}
}