import { Component } from '@angular/core';
import { WsItem } from '../../ws/models';
import template from './overview.component.html!text';
import style from './overview.component.css!text';
import wsDemoStyle from '../ws-demo.component.css!text';

@Component({
    selector: 'overview',
    template,
    styles: [ style, wsDemoStyle ]
})
export class OverviewComponent {
    private geojsonTab: string = '';
    private geojsonTabs: WsItem[] = [];

    constructor() {
        console.log('Template', { template });
        this.geojsonTabs = [
            new WsItem('Point', '', '', true),
            new WsItem('Bounding Box')
        ];
        this.switchGeojsonTab(this.geojsonTabs[0]);
    }

    public switchGeojsonTab(tab: WsItem) {
        this.geojsonTab = tab.name;
    }
}
