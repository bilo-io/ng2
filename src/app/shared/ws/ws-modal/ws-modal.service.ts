import { Injectable, Output, EventEmitter } from '@angular/core';

export class WsModalContent {
    constructor(
        public title: string,
        public message: string,
        public dismissButton: string,
        public confirmButton: string
    ) {

    }
}
@Injectable()
export class WsModalService {

    @Output() showModal$: EventEmitter<WsModalContent> = new EventEmitter<WsModalContent>();
    @Output() hideModal$: EventEmitter<any> = new EventEmitter();
    constructor() { }
    
    public showModal(title: string, message: string, dismissButton: string, confirmButton: string = undefined) {
        this.showModal$.emit(new WsModalContent(title, message, dismissButton, confirmButton));
    }

    public hideModal() {
        this.hideModal$.emit(undefined);
    }
}