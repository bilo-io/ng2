import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsItem } from '../ws.models';

@Component({
    moduleId: module.id,
    selector: 'ws-list',
    templateUrl: 'ws-list.component.html',
    styleUrls: [
        'ws-list.component.css'
    ]
})
export class WsListComponent {
    @Input() wsName: string;
    @Input() wsItems: WsItem[] = [];
    @Input() wsMultiple: boolean = false;
    @Input() wsClosable: boolean = true;
    @Input() wsBackground: string = 'red';
    @Input() wsColor: string = 'green';
    @Output() wsItemClicked$: EventEmitter<WsItem> = new EventEmitter<WsItem>();
    @Output() wsItemChanged$: EventEmitter<WsItem> = new EventEmitter<WsItem>();
    @Output() wsItemsChanged$: EventEmitter<WsItem[]> = new EventEmitter<WsItem[]>();
    
    constructor() { }

    updateItem(item: WsItem) {
        this.wsItemChanged$.emit(item);
        this.wsItemClicked$.emit(item);
    }

    updateItems() {
        this.wsItemsChanged$.emit(this.wsItems);
    }

    toggleItem(index: number) {
        if (this.wsItems[index]) {
            this.wsItems[index].toggle();
        }
        this.updateItems();
    }
}
