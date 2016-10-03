import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ws-input',
    templateUrl: 'ws-input.component.html',
    styleUrls: [ 'ws-input.component.css']
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
