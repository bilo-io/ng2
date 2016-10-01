import { Component } from '@angular/core';
import { WsAutocompleteComponent } from '../../ws/ws-autocomplete/ws-autocomplete.component';
import { WsItem } from '../../ws/ws.models';

@Component({
    moduleId: module.id,
    selector: 'autocomplete-demo',
    templateUrl: 'autocomplete-demo.component.html',
    styleUrls: [
        'autocomplete-demo.component.css',
        '../ws-demo.component.css'
    ]
})
export class AutocompleteDemoComponent {
    public items: WsItem[] = [];
    public itemsString: string = '';
    constructor() {
        this.items = [
            new WsItem('Google', 'google', undefined, false),
            new WsItem('Apple', 'apple', undefined, false),
            new WsItem('Facebook', 'facebook', undefined, false),
            new WsItem('Twitter', 'twitter', undefined, false),
            new WsItem('WhereIsMyTransport', 'wimt', undefined, false),
            new WsItem('GoMetro', 'gometro', undefined, false),
            new WsItem('Microsoft', 'microsoft', undefined, false),
            new WsItem('Vision', 'vision', undefined, false),
        ];
        this.itemsString = JSON.stringify(this.items, null, 4);
    }

    ngOnChanges(changes) {
    }

    updateItems(updatedItemString: string) {
        try {
            this.items = JSON.parse(updatedItemString);
            console.log('Items updated');
        } catch (e) {
        }
    }
}
