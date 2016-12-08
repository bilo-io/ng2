import { Component, Inject } from '@angular/core';
import { WsModalService } from '../../ws/services';
import { WsModalComponent } from '../../ws/components';
import template from './modal-demo.component.html!text';
import style from './modal-demo.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'modal-demo',
    template,
    styles: [ style, wsDemoStyle ]
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
