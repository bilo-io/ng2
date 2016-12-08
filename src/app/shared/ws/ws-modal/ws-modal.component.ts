import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { WsModalService, WsModalContent } from './ws-modal.service';
import template from './ws-modal.component.html!text';
import style from './ws-modal.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-modal',
    template,
    styles: [ style, wsStyle ]
})
export class WsModalComponent {
    private isShowing: boolean = false;
    @Input() wsTitle: string;
    @Input() wsMessage: string;
    @Input() wsConfirm: string;
    @Input() wsDismiss: string;
    @Output() wsConfirmed$: EventEmitter<any> = new EventEmitter();
    @Output() wsDismissed$: EventEmitter<any> = new EventEmitter();
    
    constructor( @Inject(WsModalService) public modalService: WsModalService) {
    }

    ngOnInit() {
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.modalService.showModal$.subscribe((content: WsModalContent) => {
            this.isShowing = true;
            this.wsTitle = content.title;
            this.wsMessage = content.message;
            this.wsDismiss = content.dismissButton;

            if (content.confirmButton) {
                this.wsConfirm = content.confirmButton;
            }
        });

        this.modalService.hideModal$.subscribe(() => {
            this.isShowing = false;
        })
    }
    
    public confirm() {
        this.isShowing = false;
        this.wsConfirmed$.emit(undefined);
    }

    public dismiss() {
        this.isShowing = false;
        this.wsDismissed$.emit(undefined);    
    }
}
