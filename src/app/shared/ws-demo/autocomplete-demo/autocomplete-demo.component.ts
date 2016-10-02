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
            new WsItem('Ares', 'Mars'),
            new WsItem('Athena', 'Minerva'),
            new WsItem('Artemis', 'Diana'),
            new WsItem('Apollo', 'Apollo'),
            new WsItem('Aphrodite', 'Venus'),
            new WsItem('Demeter', 'Demeter'),
            new WsItem('Dionysus', 'Bacchus'),
            new WsItem('Hades', 'Pluto'),
            new WsItem('Hecate', 'Hecate'),
            new WsItem('Hera', 'Juno'),
            new WsItem('Hermes', 'Mercury'),
            new WsItem('Hephaestus', 'Vulcan'),
            new WsItem('Hypnos', 'Somnus'),
            new WsItem('Iris', 'Arcus'),
            new WsItem('Janus', 'Janus'),
            new WsItem('Poseidon', 'Neptune'),
            new WsItem('Nemesis', 'Nemesis'),
            new WsItem('Nike', 'Victoria'),
            new WsItem('Tyche', 'Fortuna'),
            new WsItem('Zeus', 'Jupiter'),
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
