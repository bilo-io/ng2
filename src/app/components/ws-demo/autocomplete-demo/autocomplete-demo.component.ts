import { Component } from '@angular/core';
import { WsAutocompleteComponent } from '../../../shared/components/ws/ws-autocomplete/ws-autocomplete.component';
import { WsItem } from '../../../shared/components/ws/ws.models';

@Component({
    moduleId: module.id,
    selector: 'autocomplete-demo',
    templateUrl: 'autocomplete-demo.component.html',
    styleUrls: ['autocomplete-demo.component.css'],
    directives: [
        WsAutocompleteComponent
    ]
})
export class AutocompleteDemoComponent {
    public items: WsItem[] = [];
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
        ]
    }
}
