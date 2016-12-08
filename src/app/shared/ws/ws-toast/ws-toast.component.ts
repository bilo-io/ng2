import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsToastService, WsToast } from './ws-toast.service';
import template from './ws-toast.component.html!text';
import style from './ws-toast.component.css!text';
import wsStyle from '../scss/ws.css!text' ;
@Component({
    selector: 'ws-toast',
    template,
    styles: [ style, wsStyle ]
})
export class WsToastComponent {
    @Input() message: string;
    @Input() milliseconds: number;
    public toastType: string = 'toast-warning';
    public showing: boolean = false;
    public toasts: WsToast[] = [];

    constructor(private toaster: WsToastService) {
        this.subscribeToEvents();
        // this.toasts.push(new WsToast('Test Toast', 'toast-success', 3000));
    }

    subscribeToEvents() {
        this.toaster.pushToast$.subscribe((toast: WsToast) => {
            this.addToast(toast);
        });
    }

    addToast(toast: WsToast) {
        if (!this.toasts) {
            this.toasts = [];
        }
        this.refreshToasts();
        this.toasts.push(toast);
    }

    refreshToasts() {
        let tempToasts: WsToast[] = [];
        this.toasts.forEach((toast: WsToast) => {
            if (toast.isShowing) {
                tempToasts.push(toast);
            }
        });
        this.toasts = tempToasts;
    }
}