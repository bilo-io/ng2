import { Component, Inject } from '@angular/core';
import { WsToastComponent } from '../../../shared/components/ws/ws-toast/ws-toast.component';
import { WsToastService } from '../../../shared/components/ws/ws-toast/ws-toast.service';

@Component({
    moduleId: module.id,
    selector: 'toast-demo',
    templateUrl: 'toast-demo.component.html',
    styleUrls: [
        'toast-demo.component.css',
        '../../../shared/components/ws/ws.style.css'
    ],
    directives: [
        WsToastComponent
    ]
})
export class ToastDemoComponent {
    constructor(@Inject(WsToastService) public toaster: WsToastService) {}
}