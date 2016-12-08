import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './ws-input.component.html!text';
import style from './ws-input.component.css!text';

@Component({
    selector: 'ws-input',
    template,
    styles: [ style ]
})
export class WsInputComponent {
    
    @Input() wsType: string = 'text';
    @Input() wsName: string = 'wsName';
    @Input() wsModel: any;
    @Output() wsModelChange: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }

    ngOnChanges() {
        this.wsModelChange.emit(this.wsModel);
    }
}
