import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsItem } from '../models';
import template from './ws-list.component.html!text';
import style from './ws-list.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-list',
    template,
    styles: [ style, wsStyle ]
})
export class WsListComponent {
    
    @Input() wsName: string;
    @Input() wsItems: WsItem[] = [];
    @Input() wsMultiple: boolean = false;
    @Input() wsClosable: boolean = true;
    @Input() wsRememberState: boolean = false;
    @Input() wsShadow: boolean = false;
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

    toggleItem(item: WsItem) {
        if (!this.wsMultiple) {
            this.wsItems.forEach((item: WsItem) => {
                item.isActive = false;
            });
            item.toggle();
            this.updateItem(item);
            
        } else {
            item.toggle();
            this.updateItem(item);
            this.updateItems();
        }
    }
}
