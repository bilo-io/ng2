import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsToastService, WsToast } from './ws-toast.service';

@Component({
    moduleId: module.id,
    selector: 'ws-toast',
    templateUrl: 'ws-toast.component.html',
    styleUrls: [
        'ws-toast.component.css',
        '../scss/ws.css'
    ]
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