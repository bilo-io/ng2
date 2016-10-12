import { Component, Inject } from '@angular/core';
import { WsModalService } from '../../ws/services';
import { WsModalComponent } from '../../ws/components';
@Component({
    moduleId: module.id,
    selector: 'modal-demo',
    templateUrl: 'modal-demo.component.html',
    styleUrls: [
        'modal-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class ModalDemoComponent {
    constructor(@Inject(WsModalService) private modal: WsModalService) { }
    
    public modalConfirmed() {
        console.log('Modal was confirmed');
    }

    public modalDismissed() {
        console.log('Modal was dismissed');
    }

    public showModal() {
        this.modal.showModal('Test Modal', 'This is the message of the test modal', 'Ok', 'Cancel');
    }

    public showChoiceModal() {
        this.modal.showModal('Choice Modal', 'This is the message of the test modal', 'Ok', 'Cancel');
    }

    public showDismissModal() {
        this.modal.showModal('Dismiss Modal', 'This is the message of the test modal', 'Ok');
    }
}
