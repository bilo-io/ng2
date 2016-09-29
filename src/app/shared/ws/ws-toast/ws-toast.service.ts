import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export class WsToast {
    public timeout: any;
    public isShowing: boolean = true;
    constructor(
        public message: string,
        public style: string,
        public duration: number 
    ) {
        this.timeout = setTimeout(this.kill.bind(this), duration);
        this.isShowing = true;
    }

    private kill() {
        this.isShowing = false;
    }
}
@Injectable()
export class WsToastService {
    @Output() pushToast$: EventEmitter<WsToast> = new EventEmitter<WsToast>();
    private defaultDuration: number = 3000;
    private successDuration: number = 2000;
    private warningDuration: number = 5000;
    private errorDuration: number = 5000;

    constructor() {
    }

    public push(toast: WsToast) {
        this.pushToast$.emit(toast);
    }

    public show(message: string, duration: number = this.defaultDuration) {
        this.push(new WsToast(message, 'toast-default', duration));
    }

    public notify(message: string, light:boolean = false, duration: number = this.defaultDuration) {
        this.push(new WsToast(message, light ? 'toast-light' : 'toast-dark', duration));
    }

    public success(message: string, duration: number = this.successDuration) {
        this.push(new WsToast(message, 'toast-success', duration));
    }

    public warning(message: string, duration: number = this.warningDuration) {
        this.push(new WsToast(message, 'toast-warning', duration));
    }

    public error(message: string, duration: number = this.errorDuration) {
        this.push(new WsToast(message, 'toast-error', duration));
    }
}