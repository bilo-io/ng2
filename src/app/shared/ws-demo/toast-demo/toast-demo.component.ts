import { Component, Inject } from '@angular/core';
import { WsToastComponent } from '../../ws/ws-toast/ws-toast.component';
import { WsToastService } from '../../ws/ws-toast/ws-toast.service';

@Component({
    moduleId: module.id,
    selector: 'toast-demo',
    templateUrl: 'toast-demo.component.html',
    styleUrls: [
        'toast-demo.component.css',
        '../ws-demo.component.css',
        '../../ws/scss/ws.css'
    ]
})
export class ToastDemoComponent {
    constructor(@Inject(WsToastService) public toaster: WsToastService) {}
}