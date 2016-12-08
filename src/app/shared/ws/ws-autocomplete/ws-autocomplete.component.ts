import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WsListComponent } from '../ws-list/ws-list.component';
import { WsItem } from '../models';
import template from './ws-autocomplete.component.html!text';
import style from './ws-autocomplete.component.css!text';
import wsStyle from '../scss/ws.css!text';

@Component({
    selector: 'ws-autocomplete',
    template: template,
    style: [ style, wsStyle ]
})
export class WsAutocompleteComponent {
    @Input() noResultText: string = 'No items match your query';
    @Input() wsItems: WsItem[] = [];
    @Input() wsHint: string = 'search for items';
    @Output() wsChanged$: EventEmitter<WsItem> = new EventEmitter<WsItem>();
    
    public searchText: string = '';
    public filteredItems: WsItem[] = [];
    private showingList: boolean = false;

    constructor() { }
    
    filterItems() {
        this.showingList = true;
        this.filteredItems = [];
        this.wsItems.forEach((item: WsItem) => {
            if (item.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                this.filteredItems.push(item);
            }
        });
    }

    selectedItem(item: WsItem) {
        this.searchText = item.name;
        this.showingList = false;
        this.wsChanged$.emit(item);
    }
}
